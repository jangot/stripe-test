#!/usr/bin/env bash

#API_KEY=rk_test_518I8eqClZFDmKOz9x8d6dc8fHq6gW7IqWaYWo6PGAfli5E2I1XTAHos37zxv3vE9EiNaMB3E3k8ZxPOBiPJuUOZT00MKFAcDI5
API_KEY=sk_test_dUkeGMEXJwyMU1A0qjNONxjy

curl https://api.stripe.com/v1/tokens -H "Authorization: Bearer $API_KEY" \
  -d "card[number]"=4242424242424242 \
  -d "card[exp_month]"=9 \
  -d "card[exp_year]"=2024 \
  -d "card[cvc]"=314