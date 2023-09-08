// const API_KEY = 'pk_test_5Uyvze7dc28KinHdmq1t3JuS';
const API_KEY = 'sk_test_dUkeGMEXJwyMU1A0qjNONxjy';

const card = {
    number: '4242424242424242',
    exp_month: 9,
    exp_year: 2024,
    cvc: '314',
};

// const client = Stripe(API_KEY);
// client.createToken({ card })
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//         console.log('ERROR');
//     });

axios.post(
    'https://api.stripe.com/v1/tokens',
    {
        // 'card[number]': 4242424242424242,
        // 'card[exp_month]': 9,
        // 'card[exp_year]': 2024,
        // 'card[cvc]': 314
        ...card
    },
    {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    }
);
