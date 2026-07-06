import requests

from app.config import API_KEY


BASE_URL = "https://api.weatherapi.com/v1"


def get_current_weather(city: str):

    response = requests.get(
        f"{BASE_URL}/current.json",
        params={
            "key": API_KEY,
            "q": city
        }
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

    return response.json()