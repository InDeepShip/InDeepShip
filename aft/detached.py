import django
from django.conf import settings
#settings.configure()
django.setup()
from api.models import Port, Vessel

#new_port = Port.objects.filter(name="Carribean")
#new_port = Port(name="Carribean")
new_port = Port.objects.get(name="Carribean")
print(new_port.id)
#for port in new_ports:
#    for key,value in port.__dict__.items():
#        print(f"key: {key} value: {value}")
#new_port.save()
new_vessel = Vessel(name="Viernes", port=new_port)
new_vessel.save()


