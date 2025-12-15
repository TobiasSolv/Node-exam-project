# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

------------------------------------------------------------------------------------------------------------------------------------------------------------

# Node Exam Project

## 📘 Project Overview

This project is a **full‑stack web application** developed as part of a Node.js exam assignment.

The application combines:

* A **backend server** built with **Node.js and Express**
* A **frontend** built using **SvelteKit** and **Vite**
* **Authentication and security** features (password hashing and JWTs)
* **Database integration** using both **SQLite** and **MySQL**
* **Email functionality** via Nodemailer

The project demonstrates modern full‑stack development practices including API routing, authentication, database handling, and a component‑based frontend framework.

---

## 🚀 Technologies Used

### Backend

* Node.js (ES Modules)
* Express.js
* SQLite & MySQL
* JSON Web Tokens (JWT)
* bcrypt for password hashing
* Nodemailer for email sending

### Frontend

* Svelte 5
* SvelteKit
* Vite
* Toastr for notifications

### Tooling & Quality

* TypeScript
* ESLint
* Prettier
* svelte-check

---

## 📦 Installation

### Prerequisites

Make sure you have the following installed:

* **Node.js** (recommended: version specified in `.nvmrc`)
* **npm** (comes with Node.js)

### Setup

Clone the repository:

```bash
git clone https://github.com/TobiasSolv/Node-exam-project.git
cd Node-exam-project
```

Install dependencies:

```bash
npm install
```

---

## 🧑‍💻 How to Run the Project Locally

Follow these steps to run the project on your local machine.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/TobiasSolv/Node-exam-project.git
cd Node-exam-project
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create the Database

Before starting the server, initialize the database:

```bash
npm run create:database
```

This will create and set up the required database tables.

### 4️⃣ Run the Application

#### Option A: Development Mode (Frontend only)

```bash
npm run dev
```

This starts the Vite development server with hot reload.

#### Option B: Full Application (Production-like)

```bash
npm run express
```

This will:

1. Build the Svelte frontend
2. Start the Express backend server
3. Serve the frontend through Express

### 5️⃣ Open the Application

* Development mode: check the URL shown in the terminal (usually `http://localhost:5173`)
* Express server: typically `http://localhost:3000`

---

## ▶️ Available Scripts

| Script                    | Description                             |
| ------------------------- | --------------------------------------- |
| `npm run dev`             | Start Vite development server           |
| `npm run build`           | Build the frontend for production       |
| `npm run preview`         | Preview the production build            |
| `npm run express`         | Build frontend and start Express server |
| `npm run create:database` | Create / initialize the database        |
| `npm run lint`            | Run Prettier and ESLint                 |
| `npm run format`          | Format code using Prettier              |
| `npm run check`           | Run Svelte + TypeScript checks          |
| `npm run check:watch`     | Run checks in watch mode                |

---

## 📦 Dependencies

### Runtime Dependencies

| Package                      | Version |
| ---------------------------- | ------- |
| @eslint/compat               | ^1.4.0  |
| @eslint/js                   | ^9.38.0 |
| @sveltejs/adapter-auto       | ^7.0.0  |
| @sveltejs/adapter-node       | ^5.4.0  |
| @sveltejs/kit                | ^2.47.1 |
| @sveltejs/vite-plugin-svelte | ^6.2.1  |
| @types/node                  | ^22     |
| bcrypt                       | ^6.0.0  |
| eslint                       | ^9.38.0 |
| eslint-config-prettier       | ^10.1.8 |
| eslint-plugin-svelte         | ^3.12.4 |
| express                      | ^5.1.0  |
| globals                      | ^16.4.0 |
| jsonwebtoken                 | ^9.0.2  |
| mysql2                       | ^3.15.3 |
| nodemailer                   | ^7.0.10 |
| prettier                     | ^3.6.2  |
| prettier-plugin-svelte       | ^3.4.0  |
| sqlite                       | ^5.1.1  |
| sqlite3                      | ^5.1.7  |
| svelte                       | ^5.41.0 |
| svelte-check                 | ^4.3.3  |
| toastr                       | ^2.1.4  |
| typescript                   | ^5.9.3  |
| typescript-eslint            | ^8.46.1 |
| uuid                         | ^13.0.0 |
| vite                         | ^7.1.10 |

### Development Dependencies

| Package           | Version |
| ----------------- | ------- |
| @types/bcrypt     | ^6.0.0  |
| @types/nodemailer | ^7.0.4  |
| @types/toastr     | ^2.1.43 |

---

## 📁 Project Structure

```
/
├── database/            # Database setup and scripts
├── routers/             # Express route handlers
├── src/                 # Svelte frontend source
├── static/              # Static assets
├── app.js               # Main application entry
├── express-server.js    # Express server setup
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

---

## 📝 Notes

* The project uses **ES modules** (`"type": "module"`).
* The Express server is intended to serve the built frontend.
* Database creation must be run before starting the backend.

---

## 👤 Author

**Tobias Solv**

Node.js Exam Project
