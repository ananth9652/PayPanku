# <p align="center">PayPanku: Group Expense Management</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"></a>
  <a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
</p>

## Introduction

PayPanku is a web application designed to simplify group expense tracking and settlement. It allows users to create groups, add members, record expenses (including custom shares), and calculate the optimal transactions to settle debts efficiently.  Target users are friends, roommates, or any group needing to manage shared expenses.

## Table of Contents

1.  [Key Features](#key-features)
2.  [Installation Guide](#installation-guide)
3.  [Usage](#usage)
4.  [Environment Variables](#environment-variables)
5.  [Project Structure](#project-structure)
6.  [Technologies Used](#technologies-used)
7.  [License](#license)

## Key Features

*   **Group Management:** Create, manage, and organize expenses within specific groups.
*   **Member Management:** Add and remove members from groups easily.
*   **Expense Tracking:** Record expenses, specify the payer, and define custom shares for each member.
*   **Intelligent Settlement:**  Calculates the minimum number of transactions required to settle debts within a group.
*   **React Frontend:**  Interactive and user-friendly interface built with React.

## Installation Guide

Follow these steps to get PayPanku up and running:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install backend dependencies:**

    ```bash
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../client/split-react
    npm install
    ```

4.  **Set up environment variables:**

    *   Create a `.env` file in both the `server` and `client/split-react` directories.
    *   Populate the `.env` files with the necessary environment variables (see [Environment Variables](#environment-variables) section).

5.  **Run the backend:**

    ```bash
    cd ../../server
    npm start
    ```

6.  **Run the frontend:**

    ```bash
    cd ../client/split-react
    npm run dev
    ```

## Usage

*   **Frontend:** Access the application in your browser at the address specified by the `npm run dev` command (usually `http://localhost:5173`).  Use the intuitive interface to create groups, add members, record expenses, and view settlement transactions.
*   **Backend:** The backend provides API endpoints for the frontend to interact with.  These endpoints are documented inline in the `server/index.js` file. Example endpoints include `/groups`, `/groups/:id/members`, and `/groups/:id/expenses`.

## Environment Variables

The following environment variables are required for the application to function correctly:

*   **Server (.env in `server` directory):**
    *   `DATABASE_URL`: The connection string to your Prisma-compatible database (e.g., PostgreSQL, MySQL, SQLite).

*   **Client (.env in `client/split-react` directory):**
    *  `VITE_API_BASE_URL`: Base URL for the backend API (e.g., `http://localhost:3000`).

## Project Structure

```
├── client/split-react/
│   ├── vite.config.js
│   ├── package.json
│   ├── eslint.config.js
│   ├── package-lock.json
│   ├── index.html
│   ├── README.md
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Addexpenses.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Settle.jsx
│   │   │   ├── Addgroups.jsx
│   │   │   └── Addmembers.jsx
│   │   └── assets/
│   │       └── react.svg
├── server/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── prisma/
│   │   ├── migrations/
│   │   │   ├── migration_lock.toml
│   │   │   ├── 20250707041820_add_expenseshare/
│   │   │   │   └── migration.sql
│   │   │   └── 20250706062532_create_splitapp/
│   │   │       └── migration.sql
```

## Technologies Used

<p align="left">
  <a href="#"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"></a>
  <a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"></a>
</p>

*   **Frontend:** React, React Router, Axios
*   **Backend:** Node.js, Express, Prisma
*   **Database:**  (Configurable via `DATABASE_URL` - supports PostgreSQL, MySQL, SQLite, etc.)

## License

MIT License
