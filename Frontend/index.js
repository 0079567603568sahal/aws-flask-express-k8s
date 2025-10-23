const express = require('express');
const axios = require('axios');
const app = express();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}`);
    res.send(`Express frontend is running 🚀 <br> Using Flask backend: ${BACKEND_URL}<br> Response: ${response.data.message}`);
  } catch (error) {
    res.send(`Error connecting to backend: ${error.message}`);
  }
});

app.listen(3000, () => console.log("Frontend running on port 3000 🚀"));
