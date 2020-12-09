from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
# from rest_framework.authentication import BaseAuthentication
from rest_framework import status
from aft import settings
from .models import Vessel, Port, Propulsion, ReservedName, Registration, Surveyor, MerchantVessel
from django.core import serializers
from users import models as user_models
from rest_framework.permissions import AllowAny
# from users.models import Broker, PrivateUser
import requests
import json
from django.http import HttpResponse, JsonResponse
from datetime import datetime, date, timedelta


@api_view(['GET'])
@permission_classes([AllowAny])
def api_overview(request):
    """

    # DESCRIPTION

    Returns a list of all DRS APIs

    """
    api_urls = {
        "Login": "/api/users/",
        "Sign up": "/api/users/signup/",
        "List users": "/api/users/all/",
        "Password reset": "/api/users/password_reset/",
        "Password reset confirm": "/api/users/password_reset/confirm/",
        "Password change": "/api/users/password_change/",
        "Login": "/api/users/login/",
        "Logout": "/api/users/logout/",
        "Password change": "/api/users/password/change/",
        "Bug report": "/api/bugreport/",
        "Name look up": "/api/vessel_lookup/",
    }
    return Response(data=api_urls)


@api_view(['POST'])
@permission_classes([AllowAny])
def vessel_lookup(request):
    """

    # DESCRIPTION

    # USAGE

    1) Accepts a post request with vesselName parameter and portName param set, for example with the payload:

    ```
    {
        "vesselName" : "Fluggy Gate",
        "portName" : "Miami"
    }
    ```
    This will query the backend db and check to see if there is a vessel with that name and port attached.

    Return message:
    The server will return a message to the client letting them know the status of that ship name.


    2) Accepts a post request with only vesselName parameter set, for example with the payload:

    ```
    {
        "vesselName" : "Fluggy Gate",
    }
    ```
    This will query the backend db and check to see what ports are availble for that name.

    Return message:
    The server will return a message to the client letting them know the status of that ship name.
    """
    ship_name = request.data.get("vesselName", "")
    port_name = request.data.get("portName", "")

    if port_name != "":
        try:
            ships_with_name = Vessel.objects.get(
                name=ship_name, port__name=port_name)
            message = f"There is already a vessel with the name {ship_name} in the port {port_name}."
            name_available = False
        except Vessel.DoesNotExist:
            message = f"The name {ship_name} is available in the port {port_name}."
            name_available = True
        return Response(data={"message": message, "available": name_available}, status=200)
    else:
        port_names = [port.name for port in Port.objects.all()]
        try:
            vessels = Vessel.objects.filter(name=ship_name)
            for v in vessels:
                port_names.remove(v.port.name)
        except Vessel.DoesNotExist:
            pass
        try:
            reserve_names = ReservedName.objects.filter(name=ship_name)
            for n in reserve_names:
                if n.port.name in port_names:
                    port_names.remove(n.port.name)
        except ReservedName.DoesNotExist:
            pass
        if len(port_names) == 0:
            name_available = False
            message = f"{ship_name} is not availble at any of our ports."
        else:
            port_string = ""
            for p in port_names:
                port_string += p + ", "
            print(ship_name)
            print(port_names)
            message = f"{ship_name} is available at {port_string.strip()[:-1]}"
            name_available = True
        return Response(data={"message": message, "available": name_available, "ports": port_names}, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def bug_report(request):
    """

    # DESCRIPTION

    `POST /api/bugreport` satisifies the user story of [bug report](https://www.notion.so/User-Stories-6b653ed6007841e099e42e82aa6ff8e8) by allowing client and users to report any bugs with DRS.

    # USAGE

    Accepts a post request with message parameter and currentPage param set, for example with the payload:

    ```
    {
        "message" : "this is a bug report",
        "currentPage" : "http://206.189.218.111/services"
    }
    ```

    # bug-report` Slack channel.
    and sends a bug report with that message to the `

    It returns a message with the status code of the post request to Slack, for example:

    ```
    {
        "message" : "bug report submitted to Slack with status code: 200"
    }
    ```

    Otherwise it returns an error message with the status code set.
    """
    request_message = request.data.get("message", "")
    currentPage = request.data.get("currentPage", "")
    if request_message.strip() != '':
        message = "BUG REPORT: " + request_message + "\n\n" + "PAGE: " + currentPage
        url = settings.SLACK_WEBHOOK
        myobj = {"text": message}
        ret = requests.post(url=url, json=myobj)
        data = {
            "message": "bug report submitted to Slack with status code: %s" % str(ret.status_code)
        }
        ret_status = status.HTTP_200_OK
    else:
        data = {
            "error": "message param was empty"
        }
        ret_status = status.HTTP_400_BAD_REQUEST
    return Response(data=data, status=ret_status)


@api_view(['GET'])
@permission_classes([AllowAny])
def ports(request):
    # get all ports from the database
    port_names = [port.name for port in Port.objects.all()]
    data = {"ports": port_names}
    return Response(data=data, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def propulsion_methods(request):
    # get all propulsion methods from the database
    propulsion_names = [
        propulsion.name for propulsion in Propulsion.objects.all()]
    data = {"propulsion_methods": propulsion_names}
    return Response(data=data, status=200)


@api_view(["POST"])
def reserve_name(request):
    data = request.data
    email = data.get("email")
    # get the email of the user submitting the app
    user_with_email = user_models.CustomUser.objects.get(email=email)
    name_to_reserve = data.get("name")
    port_to_reserve = data.get("port")
    try:
        port_to_reserve = Port.objects.get(name=port_to_reserve)
    except Port.DoesNotExist:
        print("The submitted port does not exist.")
        return HttpResponse(status=400)
    new_name_object = ReservedName(name=name_to_reserve,
                                   port=port_to_reserve,
                                   reserving_user=user_with_email)
    # save the new reserved name object
    new_name_object.save()
    print("Name reserved.")
    return HttpResponse(status=200)


@api_view(["GET"])
def get_user_vessels(request):
    user_email = request.GET.get("email", "")
    if user_email == "":
        message = "There is no email attached to the request."
        return Response(
            data={"message": message},
            status=200)
    try:
        user = user_models.CustomUser.objects.get(email=user_email)
    except user_models.CustomUser.DoesNotExist:
        message = "There is no user in the database with that email."
        return Response(
            data={"message": message},
            status=200)
    vessels = Vessel.objects.filter(owner__email=user_email)
    data = {"vessels": vessels}
    return Response(data=data, status=200)


@api_view(["GET"])
def get_registrations(request):
    user_email = request.GET.get("email", "")
    if user_email == "":
        message = "There is no email attached to the request."
        return Response(
            data={"message": message},
            status=200)
    try:
        user = user_models.CustomUser.objects.get(email=user_email)
    except user_models.CustomUser.DoesNotExist:
        message = "There is no user in the database with that email."
        return Response(
            data={"message": message},
            status=200)
    regs = Registration.objects.filter(owner__email=user_email)
    data = {"registrations": regs}
    return Response(data=data, status=200)

@api_view(["GET"])
def get_single_registration(request):
    given_imo = request.GET.get("imo", "")
    user_email = request.GET.get("email", "")
    if user_email == "":
        message = "There is no email attached to the request."
        return Response(
            data={"message": message},
            status=200)
    if given_imo == "":
        message = "There is no imo attached to the request."
        return Response(
            data={"message": message},
            status=200)
    try:
        user = user_models.CustomUser.objects.get(email=user_email)
        ship = Vessel.objects.get(imo=given_imo)
    except user_models.CustomUser.DoesNotExist:
        message = "There is no user in the database with that email."
        return Response(
            data={"message": message},
            status=200)
    except Vessel.DoesNotExist:
        message = "There is no ship in the database with that imo."
        return Response(
            data={"message": message},
            status=200)
    results = Registration.objects.filter(vessel__imo=given_imo, owner__email=user_email)
    if len(results) == 0:
            data = {"message": "Not found"}
            status = 404
    else:
        regs = []
        for reg in results.values():
            # print(reg)
            reg['vessel'] = Vessel.objects.filter(id=reg['vessel_id']).values()[0]
            reg['port'] = Port.objects.filter(id=reg['port_id']).values()[0]
            reg['propulsion'] = Port.objects.filter(id=reg['propulsion_id']).values()[0]
            reg['owner'] = user_models.CustomUser.objects.filter(id=reg['owner_id']).values()[0]
            print(reg)
            regs.append(reg)
        status = 200
    return Response(data=regs, status=status)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def get_merchant_vessels(request):
    '''
    The surveyor api accepts an `api-key` header assigned to a Surveyor. Returns an array of assigned merchant vessel ships.
    '''
    api_key = request.headers.get("api-key", "")
    # print(api_key)
    # TODO check formatting
    if api_key == "" or len(api_key) != 36:
        # message = "Invalid or missing API Key"
        data = {"message": "Invalid or missing API Key"}
        status = 405
    else:
        results = MerchantVessel.objects.filter(api_key=api_key)
        if len(results) == 0:
            # message = "Not found"
            data = {"message": "Not found"}
            status = 404
        else:
            def del_api(v): del v["api_key"]; return v
            vessels = [del_api(v) for v in results.values()]
            # message = "Success"
            data = {"message": "Success", "vessels": vessels}
            status = 200
    return Response(data=data, status=status)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
def get_all_merchant_vessels(request):
    '''
    Returns an array of all merchant vessels.
    '''
    results = MerchantVessel.objects.filter()
    def del_api(v): del v["api_key"]; return v
    vessels = [del_api(v) for v in results.values()]
    # message = "Success"
    data = {"message": "Success", "vessels": vessels}
    status = 200
    return Response(data=data, status=status)


@api_view(["GET"])
def get_statuses(request):
    user_email = request.GET.get("email", "")
    if user_email == "":
        message = "There is no email attached to the request."
        return Response(
            data={"message": message},
            status=200)
    try:
        user = user_models.CustomUser.objects.get(email=user_email)
    except user_models.CustomUser.DoesNotExist:
        message = "There is no user in the database with that email."
        return Response(
            data={"message": message},
            status=200)
    try:
        regs = Registration.objects.filter(owner_id=user.id)
    except user_models.CustomUser.DoesNotExist:
        message = "There is no registration in the database under that user id."
        return Response(data={"message": message}, status=200)
    ships = []
    for reg in regs:
        try:
            vessel = Vessel.objects.get(id=reg.vessel_id)
        except user_models.CustomUser.DoesNotExist:
            message = "There is no vessel in the database under that registration id."
            return Response(data={"message": message}, status=200)
        try:
            port = Port.objects.get(id=vessel.port_id)
        except user_models.CustomUser.DoesNotExist:
            message = "There is no port in the database under that port id."
            return Response(data={"message": message}, status=200)
        port = port.name
        name = vessel.name
        imo = vessel.imo
        start_date = reg.start_date
        expiration_date = reg.expiration_date
        # old expirations with no expiration date default to registered
        if expiration_date is None:
            status = "Registered"
        else:
            time_between_insertion = expiration_date - start_date
            if time_between_insertion.days > 30:
                status = "Registered"
            elif time_between_insertion.days > 0:
                status = "Expiring Soon"
            else:
                status = "Expired"
        ship = {"name": name, "port": port, "imo": imo, "status": status}
        ships.append(ship)

    data = {"ships": ships}
    return Response(data=data, status=200)


@api_view(["POST"])
def assign_surveyor(request):
    api_key = request.data.get("api_key", "")
    imo = request.data.get("imo", "")
    # make sure an API key is supplied
    if api_key == "":
        message = "Please supply an API key for surveyor look up."
        return Response(data={"message": message}, status=400)
    if imo == "":
        message = "Please supply an IMO # for merchant vessel look up."
        return Response(data={"message": message}, status=400)
    # get the appropriate surveyor with that api key
    surveyor = Surveyor.objects.filter(api_key=api_key)
    if len(surveyor) == 0:
        message = "There is no surveyor with that API key associated."
        return Response(data={"message": message}, status=500)
    # now need to make sure that the IMO exists for a ship
    vessel = MerchantVessel.objects.filter(imoNumber=imo)
    if len(vessel) == 0:
        message = "There is no ship with that IMO # associated."
        return Response(data={"message": message}, status=500)
    vessel = vessel[0]
    vessel.api_key = api_key
    vessel.save()
    message = "The API key has been saved to the ship."
    return Response(data={"message": message}, status=200)


@api_view(["GET"])
def get_surveyors(request):
    surveyors = []
    for s in Surveyor.objects.all():
        surveyors.append({"name": s.name, "api_key": s.api_key})
    return Response(data={"surveyors": surveyors}, status=200)


@api_view(["POST"])
def renew_registration(request):
    data = request.data
    email = data.get("email")
    # get the email of the user submitting the app
    user_with_email = user_models.CustomUser.objects.get(email=email)
    imo = data.get("imo")
    try:
        vessel = Vessel.objects.get(imo=imo)
    except Vessel.DoesNotExist:
        print("The submitted IMO number is not associated with a ship.")
        return HttpResponse(status=400)
    try:
        exp_date = date.today() + timedelta(days=365)
        reg = Registration.objects.filter(
            id=vessel.id).update(expiration_date=exp_date)
    except Registration.DoesNotExist:
        print("There is no registration associated with that vessel.")
        return HttpResponse(status=400)

    return Response(data={"expiration_date": exp_date}, status=200)
