const STORAGE_KEY = {
    CUSTOMER: 'stripeCustomer',
    SESSION: 'session'
};

const api = {
    loadConfig: async () => {
        const res = await fetch('/api/config');

        return res.json();
    },
    createSession: async ({ phone, email }) => {
        const body = {
            phone,
            email,
            successUrl: `${document.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: document.location.origin
        };

        return await fetch('/api/create-session', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(res => res.json());
    },
    checkoutSession: async (sessionId) => {
        const res = await fetch(`/api/checkout-session/${sessionId}`);

        return res.json();
    }
}

$(async () => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get('session_id');

    const customerJson = localStorage.getItem(STORAGE_KEY.CUSTOMER);
    if (customerJson) {
        const customer = JSON.parse(customerJson);
        $('#customer').html(`<pre>${JSON.stringify(customer, null, 4)}</pre>`);

        const full = JSON.parse(localStorage.getItem(STORAGE_KEY.SESSION));
        $('#full').html(`<pre>${JSON.stringify(full, null, 4)}</pre>`);
    }

    const { purchase, publishableKey } = await api.loadConfig();
    const stripe = Stripe(publishableKey);

    $('#create-customer').submit(async () => {
        const email = $('#email').val();
        const phone = $('#phone').val();
        const data = await api.createSession({ email, phone });

        $('#result').html(`<pre>${JSON.stringify(data, null, 4)}</pre>`)

        await stripe.redirectToCheckout({ sessionId: data.checkoutSession.id });
        return false;
    });

    if(sessionId) {
        const data = await api.checkoutSession(sessionId);
        const { checkoutSession } = data;

        if (checkoutSession) {
            localStorage.setItem(
                STORAGE_KEY.CUSTOMER,
                JSON.stringify({
                    id: checkoutSession.customer.id,
                    email: checkoutSession.customer.email,
                    last4: checkoutSession.setup_intent.payment_method.card.last4
                })
            );
            localStorage.setItem(
                STORAGE_KEY.SESSION,
                JSON.stringify(data)
            )
            window.location.replace('/');
        }
    }
});
