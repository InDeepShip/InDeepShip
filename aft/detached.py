from users.models import CustomUser, Address, CustomUser
from api.models import Port, Vessel, Registration
import django
from django.conf import settings
# settings.configure()
django.setup()

#new_port = Port.objects.filter(name="Carribean")
#new_port = Port(name="Carribean")
# new_port = Port.objects.get(name="Carribean")
# print(new_port.id)
# #for port in new_ports:
# #    for key,value in port.__dict__.items():
# #        print(f"key: {key} value: {value}")
# #new_port.save()
# new_vessel = Vessel(name="Viernes", port=new_port)
# new_vessel.save()


#user = CustomUser.objects.get(email="mrbradle@ucsc.edu")
#address = Address()
# address.save()
#site_user = CustomUser(user=user, address=address)
# site_user.save()
# for vessel in Vessel.objects.all():
#    vessel.delete()
#
# for vessel in Registration.objects.all():
#    vessel.delete()
