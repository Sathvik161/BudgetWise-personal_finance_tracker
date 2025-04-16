#  BudgetWise - Personal Finance Visualizer

**BudgetWise** is a simple, modern web application for tracking and visualizing personal finances. It helps users manage transactions, monitor category-wise expenses, and compare spending against budgets over time.

Built with **Next.js**, **React**, **shadcn/ui**, **Recharts**, and **MongoDB**.

---

##  Features

### Stage 1: Basic Transaction Tracking
- Add, edit, delete transactions (amount, date, description)
- View all transactions in a list
- Monthly expenses bar chart
- Basic form validation

### Stage 2: Categories
- Predefined categories for each transaction
- Pie chart visualization by category
- Dashboard with:
  - Total monthly expenses
  - Category breakdown
  - Most recent transactions

### Stage 3: Budgeting
- Set monthly budgets per category
- Budget vs actual comparison chart
- Spending insights & budget warnings

---

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router), React
- **UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Database**: MongoDB (via Mongoose or custom API)
- **Deployment**: [Vercel](https://vercel.com/)

---

##  Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/budgetwise.git
cd budgetwise

### 2. Install Dependencies
```bash
npm install

### 3. Setup Environment Variables
Create a .env.local file in the root and add:
```bash
MONGODB_URI=your_mongodb_connection_string

### 4. Run the Dev Server
```bash
npm run dev

