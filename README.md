# Text Summarization App

This is a learning project developed to strengthen my full-stack skills using the MERN stack (MongoDB, Express.js, React.js and Node.js).

The app summarizes long text content where users can paste lengthy articles, documents, or any text and get concise summaries to understand the key points quickly.

**Live Demo:** [prism-summarization.vercel.app](https://prism-summarization.vercel.app)

## Features
* Text summarization using AI (Hugging Face BART model)
* User authentication via Firebase (register/login)
* Rate limiting to prevent API abuse
* Summary history tracking
* Clean and responsive interface
* MongoDB Atlas integration for data persistence

## Tech Stack
* Frontend: React.js with Vite
* Backend: Node.js, Express.js
* Database: MongoDB Atlas
* Auth: Firebase Authentication
* AI: Hugging Face (BART model)
* Deployment: Vercel (frontend), Render (backend)

## Architecture
* MVC pattern on the backend (controllers, services, models, routes)
* Backend services implemented as classes (OOP)
* Firebase Admin SDK verifies tokens on the backend

## Clone this repository
```bash
git clone https://github.com/AadityaP12/Summarization-Web-App.git
```

## Setup Instructions

### Pre-requisites
* Install Node.js and npm
* Create a MongoDB Atlas account and get your connection string
* Get a Hugging Face API key
* Create a Firebase project with Email/Password authentication enabled

### Backend Setup
```bash
cd summarization-web-app/backend
npm install
node server.js
```

Create a `.env` file in the backend directory:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
API_KEY=your_huggingface_api_key
```

Add your Firebase service account key as `serviceAccountKey.json` in the backend root.

### Frontend Setup
```bash
cd summarization-web-app/frontend
npm install
npm run dev
```

Create a `.env` file in the frontend directory with your Firebase config values and backend URL.

## Usage
1. Register or log in with your email and password
2. Paste your text content in the text area
3. Click "Simplify" to get your summary
4. View your summary history from the welcome page
