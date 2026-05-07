const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const PORT = 3000;
app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'E-Dash backend is running' });
});

app.get('/api/v1/stats/overview', async (req, res) => {
  try {
    // Query 1: Get total sales (SUM of all order amounts)
    const salesResult = await pool.query('SELECT COALESCE(SUM(total), 0) AS total_sales FROM orders');

    // Query 2: Get total number of orders
    const ordersResult = await pool.query('SELECT COUNT(*) AS total_orders FROM orders');

    // Query 3: Get total number of customers
    const customersResult = await pool.query('SELECT COUNT(*) AS total_customers FROM customers');

    // Query 4: Get growth rate (compare last 30 days vs previous 30 days)
    const growthResult = await pool.query(`
      SELECT
        COALESCE(SUM(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN total ELSE 0 END), 0) AS current_period,
        COALESCE(SUM(CASE WHEN created_at >= NOW() - INTERVAL '60 days' AND created_at < NOW() - INTERVAL '30 days' THEN total ELSE 0 END), 0) AS previous_period
      FROM orders
    `);

    const current = parseFloat(growthResult.rows[0].current_period);
    const previous = parseFloat(growthResult.rows[0].previous_period);
    const growthRate = previous > 0 ? (((current - previous) / previous) * 100).toFixed(1) : 0;

    // Query 5: Get 5 most recent orders for the activity feed
    const activityResult = await pool.query(`
      SELECT o.id, o.total AS amount, o.created_at
      FROM orders o
      ORDER BY o.created_at DESC
      LIMIT 5
    `);

    const recentActivity = activityResult.rows.map(row => ({
      id: row.id,
      event: 'New Order',
      amount: parseFloat(row.amount),
      time: getTimeAgo(row.created_at),
    }));

    res.json({
      totalSales: parseFloat(salesResult.rows[0].total_sales),
      totalOrders: parseInt(ordersResult.rows[0].total_orders),
      totalCustomers: parseInt(customersResult.rows[0].total_customers),
      growthRate: parseFloat(growthRate),
      recentActivity,
    });

  } catch (err) {
    console.error('Error fetching overview stats:', err);
    res.status(500).json({
      success: false,
      error: { code: 'STATS_ERROR', message: 'Failed to fetch dashboard statistics' }
    });
  }
});

app.post('/api/v1/system/sync', async (req, res) => {
  try {

    await new Promise(resolve => setTimeout(resolve, 1000));

    
    const customerIds = await pool.query('SELECT id FROM customers');
    const ids = customerIds.rows.map(row => row.id);

    const numOrders = Math.floor(Math.random() * 6) + 5;
    const statuses = ['Paid', 'Pending', 'Shipped'];

    for (let i = 0; i < numOrders; i++) {
      const customerId = ids[Math.floor(Math.random() * ids.length)];
      const total = (Math.random() * 500 + 10).toFixed(2);  // random amount between 10 and 510
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      await pool.query(
        'INSERT INTO orders (customer_id, total, status, created_at) VALUES ($1, $2, $3, NOW())',
        [customerId, total, status]
      );
    }

    const salesResult = await pool.query('SELECT COALESCE(SUM(total), 0) AS total_sales FROM orders');

    res.json({
      status: 'success',
      message: 'Data Re-indexed',
      updatedStats: {
        totalSales: parseFloat(salesResult.rows[0].total_sales),
        timestamp: new Date().toISOString(),
      }
    });

  } catch (err) {
    console.error('Error syncing data:', err);
    res.status(500).json({
      success: false,
      error: { code: 'SYNC_ERROR', message: 'Failed to generate new data' }
    });
  }
});

app.get('/api/v1/orders', async (req, res) => {
  try {

    const { status, page = 1 } = req.query;
    const limit = 10;  
    const offset = (page - 1) * limit;

    let query = `
      SELECT o.id, c.name AS customer, o.total, o.status
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
    `;
    let countQuery = 'SELECT COUNT(*) FROM orders';
    const params = [];

    if (status) {
      query += ' WHERE o.status = $1';
      countQuery += ' WHERE status = $1';
      params.push(status);
    }

    query += ` ORDER BY o.id DESC LIMIT ${limit} OFFSET ${offset}`;

    const ordersResult = await pool.query(query, params);
    const countResult = await pool.query(countQuery, params);

    res.json({
      data: ordersResult.rows.map(row => ({
        id: `ORD-${String(row.id).padStart(3, '0')}`,  // format as "ORD-001"
        customer: row.customer,
        total: parseFloat(row.total),
        status: row.status,
      })),
      meta: {
        totalCount: parseInt(countResult.rows[0].count),
        currentPage: parseInt(page),
      }
    });

  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({
      success: false,
      error: { code: 'ORDERS_ERROR', message: 'Failed to fetch orders' }
    });
  }
});

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return `${seconds} secs ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

app.listen(PORT, () => {
  console.log(`E-Dash backend running on http://localhost:${PORT}`);
});