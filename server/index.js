const app = require('./app');
 const dotenv = require('dotenv');
// const path = require('path');
const connectDataBase = require('./database/connection');

// // Load environment variables from server/config/config.env
// dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDataBase();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});


// mv .git ../  =>  move .git folder to parent directory