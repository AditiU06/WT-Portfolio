# 🎬 Netflix Subscription Management System
**College Mini Project | Node.js + Express.js + MySQL (WAMP) + HTML/CSS/JS**

---

## 📁 Project Structure

```
netflix-subscription/
│
├── node_modules/          ← auto-created after npm install
│
├── public/
│   ├── index.html         ← Main frontend page
│   ├── style.css          ← Netflix-style dark UI
│   └── script.js          ← All frontend logic & API calls
│
├── app.js                 ← Backend: Express server + ALL SQL queries
├── package.json           ← Project metadata & dependencies
└── README.md              ← This file
```

---

## 🛠️ Tech Stack

| Layer     | Technology                       |
|-----------|----------------------------------|
| Frontend  | HTML5, CSS3, JavaScript (Vanilla)|
| Backend   | Node.js + Express.js             |
| Database  | MySQL via WAMP Server            |
| ORM/Driver| mysql2 npm package               |
| Sessions  | express-session                  |

---

## ⚙️ WAMP Configuration

| Setting   | Value                  |
|-----------|------------------------|
| Host      | localhost              |
| Port      | 3306                   |
| Username  | root                   |
| Password  | (empty / blank)        |
| Database  | netflix_subscription   |

---

## 🚀 STEP-BY-STEP SETUP GUIDE (Beginner Friendly)

### STEP 1 — Install Node.js

1. Open your browser and go to: **https://nodejs.org**
2. Download the **LTS (Long Term Support)** version (e.g. 20.x.x LTS)
3. Run the installer (.msi for Windows)
4. Click **Next → Next → Install** (keep all defaults)
5. After installation, **verify** it works:
   - Press `Win + R`, type `cmd`, press Enter
   - Type: `node --version`
   - You should see something like: `v20.11.0`
   - Also type: `npm --version`
   - You should see something like: `10.2.4`

---

### STEP 2 — Install and Start WAMP Server

1. Download WAMP from: **https://www.wampserver.com**
2. Install it (keep all default settings)
3. After installation, launch **WampServer** from your Desktop or Start Menu
4. Wait for the icon in the System Tray (bottom-right corner) to turn **GREEN**
   - 🔴 Red = WAMP not running
   - 🟡 Yellow = Some services starting
   - 🟢 Green = All services running ✅
5. If it stays Red, right-click the icon → **Start All Services**

---

### STEP 3 — Verify MySQL is Running

1. Open your browser
2. Go to: **http://localhost/phpmyadmin**
3. You should see the phpMyAdmin login screen
4. Username: `root` | Password: (leave blank) → Click **Go**
5. If phpMyAdmin opens, MySQL is running ✅

**Alternative check:**
- Click the green WAMP icon in system tray
- Hover over **MySQL** → should show green checkmark

---

### STEP 4 — Download / Place the Project Files

**Option A — If you received a ZIP file:**
1. Extract the ZIP to a folder, e.g.: `C:\Projects\netflix-subscription\`

**Option B — If you're creating manually:**
Create the following folder structure:
```
C:\Projects\netflix-subscription\
├── public\
│   ├── index.html
│   ├── style.css
│   └── script.js
├── app.js
└── package.json
```
Then copy each file's content into the correct location.

---

### STEP 5 — Open the Project Folder in Terminal

**Method 1 (Recommended):**
1. Open File Explorer
2. Navigate to your project folder (e.g. `C:\Projects\netflix-subscription`)
3. Click on the address bar at the top
4. Type `cmd` and press Enter
5. A terminal opens directly in your project folder ✅

**Method 2:**
1. Press `Win + R`
2. Type `cmd` and press Enter
3. Type: `cd C:\Projects\netflix-subscription` (adjust path as needed)
4. Press Enter

**Verify you're in the right folder:**
```
dir
```
You should see `app.js`, `package.json`, `public` folder listed.

---

### STEP 6 — Initialize npm (if package.json is missing)

> Skip this step if `package.json` already exists in your folder.

```bash
npm init -y
```

This creates a default `package.json` file.

---

### STEP 7 — Install Dependencies

In the terminal (inside your project folder), run:

```bash
npm install express mysql2 express-session
```

Wait for it to finish. You'll see a `node_modules` folder appear.

**Optional (for auto-restart during development):**
```bash
npm install --save-dev nodemon
```

---

### STEP 8 — Run the Server

```bash
node app.js
```

You should see output like:
```
✅  Connected to MySQL server.
✅  Database "netflix_subscription" ready.
✅  Table "users" ready.
✅  Table "subscription_plans" ready.
✅  Table "subscriptions" ready.
✅  Sample users inserted.
✅  Sample plans inserted.

🎬  Netflix Subscription System running!
🌐  Open: http://localhost:3000
```

**To stop the server:** Press `Ctrl + C` in the terminal.

**Using nodemon (auto-restart on file changes):**
```bash
npx nodemon app.js
```

---

### STEP 9 — Open in Browser

1. Open any web browser (Chrome recommended)
2. Go to: **http://localhost:3000**
3. You should see the Netflix-style login screen

**Demo Login Credentials:**

| Username | Password   | Role    |
|----------|------------|---------|
| admin    | admin123   | Admin   |
| john     | john123    | User    |
| jane     | jane123    | User    |
| student  | student123 | Student |

---

### STEP 10 — Verify Database Tables are Created

1. Open browser → go to **http://localhost/phpmyadmin**
2. In the left panel, click on **netflix_subscription**
3. You should see 3 tables:
   - `users`
   - `subscription_plans`
   - `subscriptions`
4. Click on `subscription_plans` → **Browse** tab to see the 4 sample plans

---

## ✅ Features

### 🔐 Authentication
- User login with session management
- Logout functionality
- Session persists for 1 hour

### 📋 Subscription Plans (Full CRUD)
- ➕ Add new plans
- ✏️ Edit existing plans
- 🗑️ Delete plans
- 🔍 Search/filter plans

### 📁 Subscriptions
- Subscribe to a plan
- View own subscriptions
- Edit subscription (plan, status, dates)
- Cancel subscription
- View all system subscriptions

### 📊 Dashboard
- Live stats: Active subs, Revenue, Users, Plans
- Netflix-style pricing cards
- Beautiful dark UI

---

## 🐛 Common Errors & Fixes

### ❌ Error: `ECONNREFUSED` or `connect ECONNREFUSED 127.0.0.1:3306`
**Cause:** MySQL / WAMP is not running.
**Fix:**
1. Start WAMP Server
2. Wait for the tray icon to turn **green**
3. Run `node app.js` again

---

### ❌ Error: `Cannot find module 'express'`
**Cause:** Dependencies not installed.
**Fix:**
```bash
npm install express mysql2 express-session
```

---

### ❌ Error: `EADDRINUSE: address already in use :::3000`
**Cause:** Port 3000 is already in use by another process.
**Fix Option 1:** Stop the other process.
**Fix Option 2:** Change the port in `app.js`:
```js
const PORT = 4000;  // change to any free port
```
Then visit `http://localhost:4000`

---

### ❌ Error: `Access denied for user 'root'@'localhost'`
**Cause:** MySQL password mismatch.
**Fix:** Open `app.js` and check line:
```js
password: ''   // change this if your WAMP MySQL has a password
```

---

### ❌ Browser shows blank page or 404
**Cause:** Public files not in the `public/` folder.
**Fix:** Ensure `index.html`, `style.css`, `script.js` are all inside the `public/` folder.

---

### ❌ WAMP icon stays Red
**Fix:**
1. Check if Skype or IIS is using port 80 — close them
2. Right-click WAMP icon → **Start All Services**
3. Restart your computer if needed

---

## 📌 API Reference

| Method | Endpoint                    | Description                     | Auth Required |
|--------|-----------------------------|---------------------------------|---------------|
| POST   | /api/login                  | Login user                      | No            |
| POST   | /api/logout                 | Logout user                     | No            |
| GET    | /api/session                | Check session status            | No            |
| GET    | /api/plans                  | Get all plans (with search)     | No            |
| GET    | /api/plans/:id              | Get single plan                 | Yes           |
| POST   | /api/plans                  | Add new plan                    | Yes           |
| PUT    | /api/plans/:id              | Update plan                     | Yes           |
| DELETE | /api/plans/:id              | Delete plan                     | Yes           |
| GET    | /api/subscriptions          | Get current user's subs         | Yes           |
| GET    | /api/subscriptions/all      | Get all subscriptions           | Yes           |
| POST   | /api/subscriptions          | Create subscription             | Yes           |
| PUT    | /api/subscriptions/:id      | Update subscription             | Yes           |
| DELETE | /api/subscriptions/:id      | Cancel subscription             | Yes           |
| GET    | /api/stats                  | Get dashboard statistics        | Yes           |

---

## 🗄️ Database Schema

### Table: `users`
| Column     | Type         | Notes         |
|------------|--------------|---------------|
| id         | INT PK AUTO  |               |
| username   | VARCHAR(100) | UNIQUE        |
| password   | VARCHAR(100) |               |
| email      | VARCHAR(150) |               |
| full_name  | VARCHAR(150) |               |
| created_at | TIMESTAMP    | DEFAULT NOW() |

### Table: `subscription_plans`
| Column        | Type          | Notes        |
|---------------|---------------|--------------|
| id            | INT PK AUTO   |              |
| plan_name     | VARCHAR(100)  |              |
| monthly_price | DECIMAL(8,2)  |              |
| video_quality | VARCHAR(20)   | SD/HD/FHD/4K |
| screens       | INT           |              |
| description   | TEXT          |              |
| created_at    | TIMESTAMP     |              |

### Table: `subscriptions`
| Column     | Type                              | Notes            |
|------------|-----------------------------------|------------------|
| id         | INT PK AUTO                       |                  |
| user_id    | INT FK → users.id                 |                  |
| plan_id    | INT FK → subscription_plans.id    |                  |
| status     | ENUM(Active, Expired, Cancelled)  | DEFAULT Active   |
| start_date | DATE                              |                  |
| end_date   | DATE                              |                  |
| created_at | TIMESTAMP                         |                  |

---

## 👨‍💻 Author

College Mini Project — Netflix Subscription Management System  
Built with ❤️ using Node.js, Express.js, MySQL, HTML, CSS, JavaScript

---

*This project is for educational purposes only. Not affiliated with Netflix, Inc.*
