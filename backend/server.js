import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 Blog API Running...");
});

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);

// 404 Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );
});