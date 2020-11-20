from django.test import TestCase
from django.test import Client
from api.models import Vessel, Port

# Create your tests here.
httpClient = Client()

#class Utilities:
#    def create_port():
#        random_name = "Port of Meep"
#        new_port = Port(name=random_name)
#        new_port.save()
#        return new_port, random_name
#    def create_vessel(attached_port):
#        random_name = "Viernes1"
#        new_vessel = Vessel(name=random_name, port=attached_port)
#        new_vessel.save()
#        return new_vessel, random_name
#
#class Api_Test(TestCase):
#    def test_vessel_lookup_sad(self):
#        objects_to_delete = []
#        port, port_name = Utilities.create_port()
#        vessel, vessel_name = Utilities.create_vessel(port)
#        data = {
#            "vesselName": vessel_name,
#            "portName": port_name,
#        }
#        response = httpClient.post("/api/vessel_lookup/", data)
#        # should say not available
#        self.assertTrue("already" in response.data["message"])
#        self.assertEqual(response.status_code, 200)
#    def test_vessel_lookup_happy(self):
#        objects_to_delete = []
#        port, port_name = Utilities.create_port()
#        vessel, vessel_name = Utilities.create_vessel(port)
#        data = {
#            "vesselName": vessel_name + "1",
#            "portName": port_name + "1",
#        }
#        # should say available
#        response = httpClient.post("/api/vessel_lookup/", data)
#        self.assertEqual(response.status_code, 200)
#        self.assertFalse("already" in response.data["message"])
