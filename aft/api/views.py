from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from aft import settings
from .models import Vessel, Port, Propulsion, ReservedName, Registration
from users import models as user_models
from django.views.decorators.csrf import csrf_exempt
#from users.models import Broker, PrivateUser
import requests
import json
from django.http import HttpResponse


@api_view(['GET'])
def api_overview(request):
    """

    ### DESCRIPTION

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


@csrf_exempt
@api_view(['POST'])
def vessel_lookup(request):
    """

    ### DESCRIPTION

    ### USAGE

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


@csrf_exempt
@api_view(['POST'])
def bug_report(request):
    """

    ### DESCRIPTION

    `POST /api/bugreport` satisifies the user story of [bug report](https://www.notion.so/User-Stories-6b653ed6007841e099e42e82aa6ff8e8) by allowing client and users to report any bugs with DRS.

    ### USAGE

    Accepts a post request with message parameter and currentPage param set, for example with the payload:

    ```
    {
        "message" : "this is a bug report",
        "currentPage" : "http://206.189.218.111/services"
    }
    ```

    and sends a bug report with that message to the `#bug-report` Slack channel.

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


@csrf_exempt
@api_view(['GET'])
def ports(request):
    # get all ports from the database
    port_names = [port.name for port in Port.objects.all()]
    data = {"ports": port_names}
    return Response(data=data, status=200)


@csrf_exempt
@api_view(['GET'])
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
def get_vessels(request):
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
    regs = Registration.objects.get(owner_id=user.id)
    ships = []
    for reg in regs:
        vessel = Vessel.objects.get(vessel_id=reg.vessel_id)
        name = vessel.name
        port = Port.objects.get(name=id.port_id).name
        start_date = vessel.start_date


    data = {"ships": regs}
    return Response(data=data, status=200)
