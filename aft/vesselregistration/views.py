from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from vesselregistration import models
from api import models as api_models
from users import models as user_models
import json
from datetime import datetime
from rest_framework.decorators import api_view

# Create your views here.
@csrf_exempt
@api_view(["POST"])
def private_registration(request):
    """
    Function used to handle user private registration POST
    """
    data = json.loads(request.body)
    data = data['registration']
    print(data)
    # get the email out of the request
    email = data["email"]
    # first step here is to see if the IMO number for the vessel already exists
    user_with_email = user_models.SiteUser.objects.get(user__email=email)
    if user_with_email == None:
        print('No user with that email exists in the database.')
        return HttpResponse(status=400)
    try:
        print(data["port"])
        port = api_models.Port.objects.get(name=data["port"])
    except api_models.Port.DoesNotExist:
        print('Port submitted does not exist.')
        return HttpResponse(status=400)
    try:
        propulsion = api_models.Propulsion.objects.get(name=data['propulsion'])
    except api_models.Propulsion.DoesNotExist:
        print('Propulsion method submitted does not exist.')
        return HttpResponse(status=400)
    # going to need to figure out how to turn the registration into a date
    datetime_date = datetime.strptime(data["date"], "%Y-%m-%d")
    # set the attribtes that are foreign keys
    data["port"] = port
    data["propulsion"] = propulsion
    data["owner"] = user_with_email
    data["start_date"] = datetime_date
    vessel_dict = {}
    reg_dict = {}
    for field in api_models.Vessel._meta.get_fields():
        if field.name in data:
            vessel_dict[field.name] = data[field.name]
    for field in api_models.Registration._meta.get_fields():
        if field.name in data:
            reg_dict[field.name] = data[field.name]
    try:
        ship = api_models.Vessel.objects.get(imo=data["imo"])
        for key, value in vessel_dict.items():
            if hasattr(ship, key):
                setattr(ship, key, value)
    except api_models.Vessel.DoesNotExist:
        ship = api_models.Vessel(**vessel_dict)
        # init ship from fixed up
    ship.save()
    reg_dict["vessel"] = ship
    new_reg = api_models.Registration(**reg_dict)
    new_reg.save()
    return HttpResponse(status=201)


@csrf_exempt
@api_view(["GET"])
def user_private_registrations(request):
    """
        Function used to get a list of private vessel registrations
        for a certain user.
    """
    data = json.loads(request.body)

    try:
        query_email = data['email']
    except:
        # User did not provide query email, invalid query
        pass

    query_result = api_models..objects.filter(email=query_email)

    return HttpResponse(status=201)