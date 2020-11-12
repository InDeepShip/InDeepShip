from rest_framework.decorators import api_view


# Create your views here.
@api_view(['POST'])
def private_register(request):
    """
    Method used to handle user private vessel registration
    """
    print('was able to get post')