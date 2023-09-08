#!/usr/bin/env bash

API_KEY=sk_test_dUkeGMEXJwyMU1A0qjNONxjy

curl https://api.stripe.com/v1/checkout/sessions \
  -u $API_KEY \
  -d "payment_method_types[]"="card" \
  -d "mode"="setup" \
  -d "customer"="{{CUSTOMER_ID}}" \
  -d "success_url"="https://example.com/success?session_id={CHECKOUT_SESSION_ID}" \
  -d "cancel_url"="https://example.com/cancel"