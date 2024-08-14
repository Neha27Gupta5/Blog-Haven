require('dotenv').config();

const express = require('express');
const router =require('./router/auth-router');
const connection = require('./utils/db')
const errorMiddleware = require('./middleware/error-middleware');
const cors = require('cors');

const app=express();

const corsOptions = {
  // origin: "https://astonishing-babka-1c358e.netlify.app",
  // origin: "http://localhost:5173",
  // methods: "GET,POST,PUT,DELETE",
  // credentials: true,
  // allowedHeaders: ["Content-Type", "Authorization"] 
    origin: ['http://localhost:5173', 'https://astonishing-babka-1c358e.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Category'],
}
app.use(cors(corsOptions));

app.use(express.json());

app.use('/blog',router);

app.use(errorMiddleware);

const port=process.env.PORT;

connection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connection successful at port: ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

