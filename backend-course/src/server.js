import express from 'express'
import { config } from 'dotenv'
import { connectDB, disconnectDB } from './config/db.js'


const app = express()

consfig()
connectDB();


const PORT = 5001





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
