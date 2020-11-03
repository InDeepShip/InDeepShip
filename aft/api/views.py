from django.shortcuts import render
from django.http import HttpResponse
from aft import settings

import requests

# input: get request with a 'message' param
# function: sends a bug report to the #bug-report slack channel
# output: HttpResponse with status code of post request to slack channel
def BugReportViews(request):
    request_message = request.GET.get('message', '')
    # if we have an empty message then send a message to api caller
    if request_message.strip() != '':
        message = "BUG REPORT: " + request_message
        url = settings.SLACK_WEBHOOK
        myobj = {"text":message}
        x = requests.post(url=url, json = myobj)
        html = "<html><body>Bug Report Status Code: %s.</body></html>" % x.status_code
    else:
        html = "<html><body>Input Error: Message param was empty.</body></html>"
    return HttpResponse(html)

