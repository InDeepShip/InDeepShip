from django.shortcuts import render

# Create your views here.
def index(request):
    """
    Rendering Bundled React application
    :param request: http request
    :return: html template
    """
    return render(request, 'index.html')