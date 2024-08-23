require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./models');

app.use(express.json());
app.use(cors());
const userRouter = require('./routes/user.routes');
app.use('/api/v1', userRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected');
});