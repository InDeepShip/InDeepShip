from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def private_registration(request):
    """
    Function used to handle user private registration
    """
    print('able to get request')