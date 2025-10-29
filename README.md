# privacy-policy-app
  This is a learning project developed to strengthen my full-stack skills using the MERN stack (MongoDB, Express.js, React.js and Node.js).
  The app summarizes the privacy policies where the user can paste long text and get concise summaries to understand the key points.
  Future iterations will include authentication, designing the web interface using CSS.


  # Clone this repository
  git clone https://github.com/AadityaP12/privacy-policy-app.git

  # SETUP INTSRUCTIONS
  # pre-requisites
  install Node.js and npm 
  Install and run MongoDB locally and add the MongoDB URI to the .env file as MONGO_URI= your_mongo_uri
  Get hugging face api key and add it to your .env file as API_KEY= your_api_key
  Before running the backend, create a `.env` file in the root of your backend directory.
  You can use the provided `.env.example` as a reference. 
  in cmd, run it using cp `.env.example` to copy the placeholders into your `.env` file.
  The backend port can be configured in the .env file using PORT=5000. If using a different port, highlight it accordingly.
  
  
  # Backend
  cd privacy-policy-app/backend
  npm install
  node server.js
  
  # Frontend
  cd privacy-policy-app/frontend
  npm install
  npm run dev
  
