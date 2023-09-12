import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const config = {
    port: process.env.APP_PORT,
    staticDir: process.env.STATIC_DIR,
    stripe: {
        publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
        privateKey: process.env.STRIPE_SECRET_KEY,
    }
}
