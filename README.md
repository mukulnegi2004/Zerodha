# Zerodha – Full Stack Stock Trading Platform

Zerodha is a **full-stack stock trading platform inspired by Zerodha**, built using the **MERN Stack**. It includes a public landing website, secure authentication, and a protected dashboard where users can manage stocks, wallet balance, and trading activities.

> ⚠️ **Deployment Status:** This project is currently not deployed publicly. I plan to launch it professionally in the future with a custom domain and complete production setup.

---

## 📌 Project Overview

This project contains **two separate React frontends** connected to one backend API.

### 1️⃣ Landing Website (Public Frontend)

A responsive website designed for users before login.

#### Pages:
- Home
- About
- Products
- Pricing
- Support
- Signup
- Login

#### Features:
- Responsive UI using Bootstrap
- React Router navigation
- Reusable components
- Font Awesome icons
- Custom styled support page
- 404 Not Found page

---

### 2️⃣ Trading Dashboard (Protected Frontend)

Accessible only after successful login.

#### Features:
- Holdings
- Positions
- Watchlist
- Buy Stocks
- Wallet Management
- Charts & Graphs
- Protected Routes
- Logout Functionality

---

## 🚀 Tech Stack

### Frontend
- React.js
- React Router DOM
- Bootstrap
- Material UI
- Axios
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Passport.js
- Express Session
- Joi Validation

---

## 🔐 Authentication System

Implemented using:

- Passport Local Strategy
- Passport Local Mongoose
- Session-based Authentication
- Secure Login / Signup / Logout
- Protected Dashboard Routes

---

## 🛠 Real World Problems Solved

### 1️⃣ Duplicate BUY Click Issue

#### Problem:
Multiple rapid clicks on BUY button could create duplicate orders.

#### Solution:
- BUY button disabled while request is processing
- Backend duplicate order detection within short time window

---

### 2️⃣ Wallet Overspending Prevention

#### Problem:
Users could purchase without sufficient balance.

#### Solution:
- Persistent wallet system
- Add wallet funds feature
- Purchase blocked if funds are insufficient

---

### 3️⃣ Atomic Wallet Updates

During stock purchase:

- Wallet deducted first
- Order created only after successful deduction
- Prevents negative balance during concurrent requests

---

## ⚡ Database Optimization

### Users Collection
- Unique email index
- Lowercase email normalization

### Orders Collection Indexes

{ user: 1, createdAt: -1 }
{ user: 1, name: 1, qty: 1, price: 1, mode: 1, createdAt: -1 }


---

## ✅ Backend Validation

Implemented **Joi Validation** for:

* Signup Requests
* Login Requests
* Buy Orders
* Wallet Recharge
* API Payload Security

---

## 📊 Dashboard Features

* Holdings Data
* Positions Data
* Watchlist UI
* Doughnut Graph
* Vertical Graph
* Dynamic Buy Window
* Wallet Tracking

---

## 🧪 Testing

Unit testing setup using:

* Jest
* React Testing Library
* User Event

Run tests:
```bash
npm test
```

---

## 📂 Project Structure

```bash
Investify/
│── frontend/        # Landing Website
│── dashboard/       # Trading Dashboard
│── backend/         # Node + Express API
```

---

## ⚙️ Run Locally

### Clone Project

```bash
git clone https://github.com/your-username/investify.git
cd investify
```

### Install Dependencies

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Dashboard

```bash
cd dashboard
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🌟 Future Improvements

* Public Deployment with Custom Domain
* Real-time Stock Prices API
* Portfolio Profit/Loss Analytics
* Admin Panel
* Email Notifications
* Mobile App Version

---

## 📬 Connect with Me

- 💼 [GitHub](https://github.com/mukulnegi2004)
- 💬 [LinkedIn](https://www.linkedin.com/in/mukul-negi-431039378/)
- 📫 Email: mannunegi126@gmail.com

---

⭐ If you like this project, feel free to star it and give feedback!
