const userRoutes = require('./user_routes/userRoutes');
const express = require('express');
// const taskRoutes = require('./routes/taskRoutes');
const app = express();

app.use(express.json());
app.use('/api', userRoutes);
// app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});