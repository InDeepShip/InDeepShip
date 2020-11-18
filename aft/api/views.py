from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from aft import settings
from .models import Vessel, Port, Propulsion
from django.views.decorators.csrf import csrf_exempt

import requests


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

    Accepts a post request with message parameter and currentPage param set, for example with the payload:

    ```
    {
        "vesselName" : "Fluggy Gate",
        "portName" : "Miami"
    }
    ```
    This will query the backend db and check to see if there is a vessel with that name and port attached.

    Return message:
    The server will return a message to the client letting them know the status of that ship name.
    """
    ship_name = request.data.get("vesselName", "")
    port_name = request.data.get("portName", "")
    try:
        ships_with_name = Vessel.objects.get(
            name=ship_name, port__name=port_name)
        message = f"There is already a vessel with the name {ship_name} in the port {port_name}."
        name_available = False
    except Vessel.DoesNotExist:
        message = f"The name {ship_name} is available in the port {port_name}."
        name_available = True
    return Response(data={"message": message, "available": name_available}, status=200)


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
    propulsion_names = [propulsion.name for propulsion in Propulsion.objects.all()]
    data = {"propulsion_methods": propulsion_names}
    return Response(data=data, status=200)
