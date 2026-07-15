import { config } from 'dotenv'
import express from 'express'
import { connectDB, disconnectDB } from './config/db.js'

const PORT = 5001

//Routes
import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js';
import watchlistRouts from './routes/watchlistRouts.js'

const app = express()

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

connectDB();
config()

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRouts);




app.listen(PORT, () => [
    console.log("server is runing on port-", PORT)
])

//situatiiti care ne fac sa ne dorim sa ne deconecam de la data de baze
// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});