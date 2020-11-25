import django
from django.conf import settings
import datetime
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

# address = Address(lineOne="1156 High Street",
#                   lineTwo="",
#                   lineThree="",
#                   postcode="95060",
#                   country="USA")
# address.save()
# address = Address(lineOne="1156 Low Street",
#                   lineTwo="",
#                   lineThree="",
#                   postcode="15010",
#                   country="USA")
# address.save()
# address = Address(lineOne="1156 Medium Street",
#                   lineTwo="",
#                   lineThree="",
#                   postcode="85800",
#                   country="USA")
# address.save()

# mv = MerchantVessel.objects.create(
#     # same as IMO
#     officialNumber="IMO Registered Owner 8814275",
#     name="Seaborne Scaleywag",
#     type="Handimax Bulk Carrier",
#     keelLayingDate="2020-04-20",
#     grossTonnage=2,
#     hin="ABC 065LE B820",
#     # UK call sign
#     callSign="W6RO",
#     # A UK mmsi can start with 232
#     mmsi=232948182,
#     imoNumber=8814275,
#     yearOfBuild=2020,
#     registeredLength=15,
#     registration={
#         "status":  "Active"
#     },
#     builder={
#         "name": "ABC Merchant Ship Builders",
#         "address": {
#             "lineOne": "71 Cherry Court",
#             "lineTwo": "SOUTHAMPTON",
#             "lineThree": "SO53 5PD",
#             "postcode": "SO53",
#             "country": "GBR"
#         },
#         "email": "support@abcmerchantshipbuilders.com",
#         "telephone": "+44 7432 103020"
#     },
#     managingCompany={
#         "name": "ABC UK Ship Managers",
#         "address": {
#             "lineOne": "102 Lemon Dr",
#             "lineTwo": "SOUTHAMPTON",
#             "lineThree": "SO53 5PD",
#             "postcode": "SO53",
#             "country": "GBR"
#         },
#         "email": "support@abcukshipmanagers.com",
#         "telephone": "+44 7911 154256"
#     },
#     engines=[{
#         "kW": 342,
#         "manufacturer": "ABC Engines Ltd",
#         "model": "ABC 3209"
#     }],
#     api_key="6305541d-7524-41b8-91d4-cfa47c24c502"
# )
