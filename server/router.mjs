import express from 'express';
import Stripe from 'stripe';

import { config } from './config.mjs';

const stripe = new Stripe(config.stripe.privateKey, {});
export const api = express.Router();

api.get('/config', (req, res) => {
    const purchase = {
        amount: 0,
        currency: 'USD'
    };

    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        purchase
    });
});

api.post('/create-session', async (req, res) => {
    const {
        phone,
        email,
        cancelUrl,
        successUrl,
    } = req.body;

    try {
        const customer = await stripe.customers.create({
            phone,
            email,
        });

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'setup',
            customer: customer.id,
            success_url: successUrl,
            cancel_url: cancelUrl,
        });
        console.log(customer, checkoutSession);

        res.send({ customer, checkoutSession, body: req.body });
    } catch (error) {
        res.status(400).send({ error });
    }
});


api.get('/checkout-session/:id', async (req, res) => {
    const { id } = req.params;

    const checkoutSession = await stripe.checkout.sessions.retrieve(id, {
        expand: ['customer', 'setup_intent.payment_method']
    });

    console.log(checkoutSession);
    res.send({ checkoutSession });
});
