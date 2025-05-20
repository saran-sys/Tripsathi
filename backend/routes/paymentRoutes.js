import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', verifyToken, createPaymentIntent);

// Handle Stripe webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router; 