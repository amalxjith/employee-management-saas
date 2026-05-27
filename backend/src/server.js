const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = require("./app");
dotenv.config();
connectDB();


// Test route
app.get('/', (req, res) => {
  res.send('API Running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});