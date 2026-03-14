# Text Summarization App

This is a learning project developed to strengthen my full-stack skills using the MERN stack (MongoDB, Express.js, React.js and Node.js).

The app summarizes long text content where users can paste lengthy articles, documents, or any text and get concise summaries to understand the key points quickly.


## Features
- Text summarization using AI (Hugging Face BART model)
- Summary history tracking
- Clean and responsive interface
- MongoDB integration for data persistence

## Clone this repository
```bash
git clone https://github.com/AadityaP12/summarization-web-app.git
```

## Setup Instructions

### Pre-requisites
- Install Node.js and npm
- Install and run MongoDB locally and add the MongoDB URI to the `.env` file as `MONGO_URI=your_mongo_uri`
- Get a Hugging Face API key and add it to your `.env` file as `API_KEY=your_api_key`
- Before running the backend, create a `.env` file in the root of your backend directory
- You can use the provided `.env.example` as a reference
- In cmd, run `cp .env.example .env` to copy the placeholders into your `.env` file
- The backend port can be configured in the `.env` file using `PORT=5000`. If using a different port, update it accordingly

### Backend Setup
```bash
cd summarization-web-app/backend
npm install
node server.js
```

### Frontend Setup
```bash
cd summarization-web-app/frontend
npm install
npm run dev
```

## Tech Stack
- **Frontend**: React.js with Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: Hugging Face (BART model for summarization)

## Usage
1. Start both backend and frontend servers
2. Navigate to the frontend URL (typically `http://localhost:5173`)
3. Paste your text content in the text area
4. Click "Simplify" to get your summary
5. View your summary history from the welcome page