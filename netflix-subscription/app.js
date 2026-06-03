// Netflix Subscription Management System — app.js
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'netflix_secret_key_2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

// MySQL Connection
const rootConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: ''
});

const SQL_CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS netflix_subscription`;
const SQL_CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const SQL_CREATE_PLANS_TABLE = `
  CREATE TABLE IF NOT EXISTS subscription_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(100) NOT NULL,
    monthly_price DECIMAL(8,2) NOT NULL,
    video_quality VARCHAR(20) NOT NULL,
    screens INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
const SQL_CREATE_SUBSCRIPTIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    status ENUM('Active','Expired','Cancelled') DEFAULT 'Active',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE
  )
`;
const SQL_INSERT_SAMPLE_USERS = `
  INSERT IGNORE INTO users (username, password, email, full_name) VALUES
    ('admin', 'admin123', 'admin@netflix.com', 'Administrator'),
    ('john', 'john123', 'john@example.com', 'John Doe'),
    ('michael', 'michael123', 'michael@example.com', 'Michael Brown'),
    ('sarah', 'sarah123', 'sarah@example.com', 'Sarah Wilson')
`;
const SQL_INSERT_SAMPLE_PLANS = `
  INSERT IGNORE INTO subscription_plans (id, plan_name, monthly_price, video_quality, screens, description) VALUES
    (1, 'Basic', 199.00, 'SD', 1, 'Watch on any TV, phone, tablet or computer. SD quality.'),
    (2, 'Standard', 499.00, 'HD', 2, 'Watch on any TV, phone, tablet or computer. Full HD quality.'),
    (3, 'Premium', 799.00, '4K', 4, 'Best video and audio quality. 4K+HDR on all your screens.')
`;

let db;

function initDatabase() {
  rootConnection.connect((err) => {
    if (err) { console.error('MySQL error:', err.message); process.exit(1); }
    console.log('Connected to MySQL server');
    rootConnection.query(SQL_CREATE_DATABASE, (err) => {
      if (err) { console.error(err); process.exit(1); }
      console.log('Database "netflix_subscription" ready');
      rootConnection.end();
      
      db = mysql.createPool({
        host: 'localhost', port: 3306, user: 'root', password: '',
        database: 'netflix_subscription', waitForConnections: true, connectionLimit: 10
      });
      
      db.query(SQL_CREATE_USERS_TABLE, (err) => {
        if (err) console.error(err);
        else console.log('Table "users" ready');
        db.query(SQL_CREATE_PLANS_TABLE, (err) => {
          if (err) console.error(err);
          else console.log('Table "subscription_plans" ready');
          db.query(SQL_CREATE_SUBSCRIPTIONS_TABLE, (err) => {
            if (err) console.error(err);
            else console.log('Table "subscriptions" ready');
            db.query(SQL_INSERT_SAMPLE_USERS);
            db.query(SQL_INSERT_SAMPLE_PLANS);
            app.listen(PORT, () => console.log(`\nServer running at http://localhost:${PORT}\n`));
          });
        });
      });
    });
  });
}

function requireLogin(req, res, next) {
  if (req.session?.user) return next();
  res.status(401).json({ success: false, message: 'Login required' });
}

// AUTH
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err || results.length === 0) return res.json({ success: false, message: 'Invalid username or password' });
    req.session.user = { id: results[0].id, username: results[0].username, full_name: results[0].full_name, email: results[0].email };
    res.json({ success: true, user: req.session.user });
  });
});
app.post('/api/logout', (req, res) => { req.session.destroy(); res.json({ success: true }); });
app.get('/api/session', (req, res) => {
  res.json(req.session?.user ? { loggedIn: true, user: req.session.user } : { loggedIn: false });
});

// PLANS
app.get('/api/plans', (req, res) => {
  const search = req.query.search ? `%${req.query.search}%` : '%';
  db.query('SELECT * FROM subscription_plans WHERE plan_name LIKE ? OR video_quality LIKE ? OR monthly_price LIKE ? ORDER BY monthly_price', [search, search, search], (err, results) => {
    res.json({ success: !err, plans: results || [] });
  });
});
app.get('/api/plans/:id', requireLogin, (req, res) => {
  db.query('SELECT * FROM subscription_plans WHERE id = ?', [req.params.id], (err, results) => {
    res.json({ success: !err && results.length, plan: results[0] });
  });
});
app.post('/api/plans', requireLogin, (req, res) => {
  const { plan_name, monthly_price, video_quality, screens, description } = req.body;
  db.query('INSERT INTO subscription_plans (plan_name, monthly_price, video_quality, screens, description) VALUES (?,?,?,?,?)',
    [plan_name, monthly_price, video_quality, screens, description], (err, result) => {
      res.json({ success: !err, message: err ? 'Error adding plan' : 'Plan added successfully', id: result?.insertId });
    });
});
app.put('/api/plans/:id', requireLogin, (req, res) => {
  const { plan_name, monthly_price, video_quality, screens, description } = req.body;
  db.query('UPDATE subscription_plans SET plan_name=?, monthly_price=?, video_quality=?, screens=?, description=? WHERE id=?',
    [plan_name, monthly_price, video_quality, screens, description, req.params.id], (err) => {
      res.json({ success: !err, message: err ? 'Error updating plan' : 'Plan updated successfully' });
    });
});
app.delete('/api/plans/:id', requireLogin, (req, res) => {
  db.query('DELETE FROM subscription_plans WHERE id = ?', [req.params.id], (err) => {
    res.json({ success: !err, message: err ? 'Error deleting plan' : 'Plan deleted successfully' });
  });
});

// SUBSCRIPTIONS
app.get('/api/subscriptions', requireLogin, (req, res) => {
  db.query(`SELECT s.*, p.plan_name, p.monthly_price, p.video_quality, p.screens 
    FROM subscriptions s JOIN subscription_plans p ON s.plan_id = p.id WHERE s.user_id = ? ORDER BY s.created_at DESC`, 
    [req.session.user.id], (err, results) => { res.json({ success: !err, subscriptions: results || [] }); });
});
app.get('/api/subscriptions/all', requireLogin, (req, res) => {
  db.query(`SELECT s.*, u.full_name, u.email, p.plan_name, p.monthly_price, p.video_quality, p.screens 
    FROM subscriptions s JOIN users u ON s.user_id = u.id JOIN subscription_plans p ON s.plan_id = p.id ORDER BY s.created_at DESC`, 
    (err, results) => { res.json({ success: !err, subscriptions: results || [] }); });
});
app.post('/api/subscriptions', requireLogin, (req, res) => {
  const { plan_id, start_date, end_date } = req.body;
  db.query('INSERT INTO subscriptions (user_id, plan_id, status, start_date, end_date) VALUES (?, ?, "Active", ?, ?)',
    [req.session.user.id, plan_id, start_date, end_date], (err) => {
      res.json({ success: !err, message: err ? 'Error creating subscription' : 'Subscribed successfully' });
    });
});
app.put('/api/subscriptions/:id', requireLogin, (req, res) => {
  const { plan_id, status, start_date, end_date } = req.body;
  db.query('UPDATE subscriptions SET plan_id=?, status=?, start_date=?, end_date=? WHERE id=? AND user_id=?',
    [plan_id, status, start_date, end_date, req.params.id, req.session.user.id], (err) => {
      res.json({ success: !err, message: err ? 'Error updating subscription' : 'Subscription updated successfully' });
    });
});
app.delete('/api/subscriptions/:id', requireLogin, (req, res) => {
  db.query('UPDATE subscriptions SET status = "Cancelled" WHERE id = ? AND user_id = ?', [req.params.id, req.session.user.id], (err) => {
    res.json({ success: !err, message: err ? 'Error cancelling subscription' : 'Subscription cancelled successfully' });
  });
});

// STATS
app.get('/api/stats', requireLogin, (req, res) => {
  db.query('SELECT COUNT(*) AS active FROM subscriptions WHERE status = "Active"', (e1, r1) => {
    db.query('SELECT COALESCE(SUM(p.monthly_price),0) AS total FROM subscriptions s JOIN subscription_plans p ON s.plan_id = p.id WHERE s.status = "Active"', (e2, r2) => {
      db.query('SELECT COUNT(*) AS users FROM users', (e3, r3) => {
        db.query('SELECT COUNT(*) AS plans FROM subscription_plans', (e4, r4) => {
          res.json({ success: true, activeSubscriptions: r1[0].active, totalRevenue: r2[0].total, totalUsers: r3[0].users, totalPlans: r4[0].plans });
        });
      });
    });
  });
});

initDatabase();