from fastapi import APIRouter

from app.weather import get_current_weather
from app.weather import get_forecast

router = APIRouter()


@router.get("/weather/current")
def current(city: str):
    return get_current_weather(city)


@router.get("/weather/forecast")
def forecast(city: str):
    return get_forecast(city)