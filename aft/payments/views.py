from django.conf import settings
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import stripe
import json
import os

# Create your views here.
# payments/views.py
stripe.api_key = 'sk_test_51HrAP1ClBcrzs3YUEksESYND5tTkc8xutMcbrIXzppl5ux0liqv6g8qk8XFzXavqngmqMAFFlC3Y0dPSdzqbeN7K001BNcPEpA'

@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
    amount=1000, currency='pln',
    payment_method_types=['card'],
    receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)

@api_view(['POST'])
def create_checkout_session(request):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                'currency': 'usd',
                'product_data': {
                'name': 'Private Registration',
                },
                'unit_amount': 1000,
            },
            'quantity': 1,
            }],
            mode='payment',
            success_url=os.path.join(settings.SERVER_ADDRESS, 'dashboard'),
            cancel_url=os.path.join(settings.SERVER_ADDRESS, 'cancel'),
        )
    except Exception as e:
        print(e)

    return Response({ 'id': session.id }, status=status.HTTP_200_OK)