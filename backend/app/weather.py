import requests

from app.config import API_KEY
from fastapi import HTTPException


BASE_URL = "https://api.weatherapi.com/v1"


def get_current_weather(city: str):

    response = requests.get(
        f"{BASE_URL}/current.json",
        params={
            "key": API_KEY,
            "q": city
        }
    )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.json()
        )

    return response.json()


def get_forecast(city: str):

    response = requests.get(
        f"{BASE_URL}/forecast.json",
        params={
            "key": API_KEY,
            "q": city,
            "days": 8
        }
    )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.json()
        )

    return response.json()