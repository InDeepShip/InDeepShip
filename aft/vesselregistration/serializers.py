from rest_framework import serializers
from rest_framework.response import Response
from . import models


class PrivateRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PrivateRegistrationForms
        fields = ('name', 'vessel', 'email', 'phone', 'address', 'port', 'imo', 'tonnage', 'propulsion',
                  'builder_name', 'builder_address', 'date', 'yard_number', 'vessel_length', 'hulls', 'purpose')

    def save(self, data):
        try:
            models.PrivateRegistrationForms.objects.create(**data)
        except Exception as e:
            print('Issue creating a new private registration')
            return Response(status=400)
        return Response(status=201)
