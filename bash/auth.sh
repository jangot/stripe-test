#!/usr/bin/env bash

API_KEY=rk_test_518I8eqClZFDmKOz9x8d6dc8fHq6gW7IqWaYWo6PGAfli5E2I1XTAHos37zxv3vE9EiNaMB3E3k8ZxPOBiPJuUOZT00MKFAcDI5

echo $API_KEY

curl https://api.stripe.com/v1/balance -H "Authorization: Bearer $API_KEY"