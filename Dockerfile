FROM python:3.8

COPY . ./InDeepShip
WORKDIR /InDeepShip

RUN pip3 install -r requirements.txt
EXPOSE 8000

CMD ["python", "aft/manage.py", "runserver", "0.0.0.0:8000"]
