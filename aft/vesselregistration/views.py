from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from vesselregistration import models
from api.models import models as api_models
from users import models as user_models
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
        # get the email out of the request
        email = data["email"]
        print(email)
        # first step here is to see if the IMO number for the vessel already exists
        user_with_email = user_models.SiteUser.objects.get(user__email=email)
        if user_with_email == None:
            print('No user with that email exists in the database.')
            return HttpResponse(status=400)
        try:
            port = Port.objects.get(name=data["port"])
        except Port.DoesNotExist:
            print('Port submitted does not exist.')
            return HttpResponse(status=400)
        try:
            propulsion = Propulsion.objects.get(name=data['propulsion'])
        except Propulsion.DoesNotExist:
            print('Propulsion method submitted does not exist.')
            return HttpResponse(status=400)
        # going to need to figure out how to turn the registration into a date
        print(data["date"])
        # set the attribtes that are foreign keys
        data["port"] = port
        data["propulsion"] = propulsion
        try:
            ship = Vessel.objects.get(imo=data["imo"])
         # if the vessel doesn't exist, need to create a new one
            for key, value in data:
                if hasattr(ship, key):
                    setattr(ship, key, value)
        except Vessel.DoesNotExist:    
#            ship = Vessel(name=name,
#                    port=port,
#                    imo=data['imo'], 
#                    tonnage=data['tonnage'],
#                    propulsion=propulsion,
#                    yard_number=data['yard_number'],
#                    vessel_length=data['vessel_length'],
#                    hulls = data['hulls'],
#                    purpose=data['purpose']
#                    )
            # init ship from fixed up 
            ship = Vessel(**data)
            ship.save()
        try:
            models.Registration.objects.create(**data)
        except Exception as e:
            print(e)
            print('Issue creating a new private registration')
            return HttpResponse(status=400)
        return HttpResponse(status=201)
    return HttpResponse(status=400)
