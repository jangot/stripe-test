import Stripe from 'stripe';

const KEY = 'rk_test_518I8eqClZFDmKOz9x8d6dc8fHq6gW7IqWaYWo6PGAfli5E2I1XTAHos37zxv3vE9EiNaMB3E3k8ZxPOBiPJuUOZT00MKFAcDI5';
const client = Stripe(KEY);

const card = {
    number: '4242424242424242',
    exp_month: 9,
    exp_year: 2024,
    cvc: '314',
};

try {
    const token = await client.tokens.create({ card });

    console.log(token)
} catch (error) {
    console.log(error);
    console.log('ERROR');
}