import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Blog API is running...");
});

// Test Route
app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Blog API"
    });
});

// Port
const PORT = 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});