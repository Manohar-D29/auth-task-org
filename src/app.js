import express from 'express';
import authRouter from './routes/auth.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// health check route
app.get('/health-check', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Checking health'
    })
})


// routes
app.use('/api/auth', authRouter)


app.use(errorMiddleware)

export default app;
