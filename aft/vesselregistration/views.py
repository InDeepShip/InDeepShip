from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from vesselregistration import models
import json

# Create your views here.
@csrf_exempt
def private_registration(request):
    """
    Function used to handle user private registration POST
    """

    if request.method == 'POST':
        data = json.loads(request.body)
        data = data['registration']

        try:
            models.PrivateRegistrationForms.objects.create(**data)

        except Exception as e:
            print('Issue creating a new private registration')
            return HttpResponse(status=400)

        return HttpResponse(status=201)
    return HttpResponse(status=400)