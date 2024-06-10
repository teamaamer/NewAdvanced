import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

import userRoutes from './routes/userRoutes.js';
import exchange from './routes/exchangeRoutes.js';
import gardenRouter from './routes/gardenRoutes.js';
import guideRouter from './routes/guideRouter.js';

app.use('/users', userRoutes);
app.use('/exchange', exchange);
app.use('/gardens', gardenRouter);
app.use('/guides', guideRouter);

// Mount the plot routes under the gardens routes
app.use('/gardens/:gardenId/plots', require('./routes/plotRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
