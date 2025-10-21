import express, { NextFunction, Request, Response, Router } from "express";
import authRoutes from './router/auth.router';
import userRoutes from './router/user.router'

const router: Router = express.Router();

// resources
router.use('/auth', authRoutes);
router.use('/users', userRoutes)

export default router;