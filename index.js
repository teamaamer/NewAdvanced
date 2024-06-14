import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

import adviceRouter from './routes/adviceroutes.js';
import eventRouter from './routes/eventroutes.js';
import productRouter from './routes/prorouter.js';
import serviceRouter from './routes/serrouters.js';

app.use('/advices', adviceRouter);
app.use('/products', productRouter);
app.use('/services', serviceRouter);
app.use('/events', eventRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
