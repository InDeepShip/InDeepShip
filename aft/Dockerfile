FROM python:3.8

COPY . ./aft
WORKDIR /aft

RUN pip3 install -r requirements.txt
RUN echo "DATABASE_HOST=mongodb://127.0.0.1:27017/InDeepShipData_test" >> .env
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
