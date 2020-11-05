from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from aft import settings

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
        "Bug report": "/api/bugreport/"
    }
    return Response(data=api_urls)


@api_view(['POST'])
def bug_report(request):
    """

    ### DESCRIPTION

    `POST /api/bugreport` satisifies the user story of [bug report](https://www.notion.so/User-Stories-6b653ed6007841e099e42e82aa6ff8e8) by allowing client and users to report any bugs with DRS.

    ### USAGE

    Accepts a post request with message parameter set, for example with the payload:

    ```
    {
        "message" : "this is a bug report"
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
    if request_message.strip() != '':
        message = "BUG REPORT: " + request_message
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
