from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from aft import settings

import requests


@api_view(['GET'])
def api_overview(request):
    """

    Displays overview of available DRS APIs

    """
    api_urls = {
        "Sign up": "/api/users/signup/",
        "List users": "/api/users/all/",
        "Password reset": "/api/users/password/reset/",
        "Password reset confirm": "/api/users/password/reset/confirm/",
        "Login": "/api/users/login/",
        "Logout": "/api/users/logout/",
        "User details": "/api/users/^user/",
        "Password change": "api/users/password/change/",
        "Bug report": "/api/bugreport/"
    }
    return Response(data=api_urls)


@api_view(['POST'])
def bug_report(request):
    """

    Forwards a POST request with the `message` to be recorded on the Slack `#bug-report` channel.

    Accepts the following POST parameters: `message` Returns the success/fail message.

    """
    request_message = request.GET.get('message', '')
    # if we have an empty message then send a message to api caller
    if request_message.strip() != '':
        message = "BUG REPORT: " + request_message
        url = settings.SLACK_WEBHOOK
        myobj = {"text": message}
        ret = requests.post(url=url, json=myobj)
        data = {
            "message": "bug report submitted to Slack with status code: " % ret.status_code
        }
        ret_status = status.HTTP_200_OK
    else:
        data = {
            "error": "message param was empty"
        }
        ret_status = status.HTTP_400_BAD_REQUEST
    return Response(data=data, status=ret_status)
