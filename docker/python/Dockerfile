FROM python:latest

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /django_app
WORKDIR /django_app
COPY requirements.txt /django_app/
RUN pip install --upgrade pip && pip install -r requirements.txt
ADD . /django_app/