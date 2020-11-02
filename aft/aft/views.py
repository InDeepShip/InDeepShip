from django.shortcuts import render
from django.http import HttpResponse
from . import settings

import requests

# input: get request with a 'message' param
# function: sends a bug report to the #bug-report slack channel
# output: HttpResponse with status code of post request to slack channel
def BugReportViews(request):
    message = "BUG REPORT: " + request.GET.get('message', None)
    url = settings.SLACK_WEBHOOK
    myobj = {"text":message}
    x = requests.post(url=url, json = myobj)
    html = "<html><body>Bug Report Status Code: %s.</body></html>" % x.status_code
    return HttpResponse(html)
