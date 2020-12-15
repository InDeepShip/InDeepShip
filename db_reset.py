from pymongo import MongoClient
client = MongoClient(
    "mongodb+srv://SirDavid:fluffygate@indeepshipcluster.7rnt2.mongodb.net/NavisAlbumData?ssl=true&ssl_cert_reqs=CERT_NONE&retryWrites=true&w=majority")
db = client['NavisAlbumData']


def reset_user(filter):
    db.account_emailaddress.find_one_and_delete(filter)
    user = db.users_customuser.find_one_and_delete(filter)
    if user != None:
        db.authtoken_token.find_one_and_delete(
            {"user_id": user["id"]})


def reset_registration():
    db.api_reservedname.find_one_and_delete(
        {"name": "The Black Pearl", "port_id": 98})
    vessel = db.api_vessel.find_one_and_delete(
        {"name": "The Flying Dutchman", "port_id": 99})
    if vessel != None:
        db.api_registration.find_one_and_delete({"vessel_id": vessel["id"]})


reset_user({"email": "hilda@gmail.com"})
reset_user({"email": "fft@gmail.com"})
reset_registration()
