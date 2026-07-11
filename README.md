# PRODIGY_WD_05
This is task number 5 following my internship for Prodigy InfoTech and for this task I will create a weather web application that uses HTML, CSS &amp; Javascript. This weather app fetches weather data from a weather api based on the user's inputted location (city). This app should display weather conditions , temperature and other relevant information.

# 🌤️ Weather App

A modern weather application built with **HTML, CSS, JavaScript, and FastAPI** that provides real-time weather conditions and a 7-day forecast for cities around the world.

Unlike traditional frontend-only weather apps, this project uses a **FastAPI backend** to securely handle API requests and protect the WeatherAPI key from being exposed in the browser.

🔗 **Live Demo:** [https://tarekmoustafaelsayed.github.io/PRODIGY_WD_05/](https://tarekmoustafaelsayed.github.io/PRODIGY_WD_05/)

---

## 💡 Why This Project?

This project began as a frontend weather application and was later redesigned into a full-stack application using FastAPI.

The main objective was not only to display weather information, but also to learn backend development fundamentals and implement secure API key management by moving all third-party API communication to a Python backend.

This project demonstrates frontend development, REST API integration, backend development with FastAPI, environment variable management, asynchronous JavaScript, and deployment-ready architecture.

---

## 📸 Preview

### Home Screen

![Home Screen](screenshots/Index.png)

### Weather Data

![Weather Data](screenshots/Weather%20Data.png)

### Forecast Data

![Forecast Data](screenshots/Interactive%20Forecast%20Data.png)

### City Invalid or not found

![City Invalid](screenshots/Not%20Found.png)

---

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Display current temperature
- ☁️ Current weather condition
- 💧 Humidity information
- 💨 Wind speed
- 📅 7-day weather forecast
- 🖱️ Interactive forecast cards
- ⌨️ Keyboard support (Enter to search, Arrow Left navigation)
- ❌ Invalid city handling with a custom "Not Found" page
- 🔒 Secure backend with hidden API key

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

### Backend

- Python
- FastAPI
- Requests
- Python-dotenv
- Uvicorn

### API

- WeatherAPI

---

## 📂 Project Structure

```
Weather-App/
│
├── frontend/
│   ├── assets/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── app/
│   │   ├── config.py
│   │   ├── main.py
│   │   ├── routes.py
│   │   └── weather.py
│   │
│   ├── .env
│   ├── requirements.txt
│   └── .gitignore
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/TarekMoustafaElsayed/Weather-App.git
```

---

### 2. Navigate into the project

```bash
cd Weather-App
```

---

## Backend Setup

Navigate into the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it:

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
API_KEY=YOUR_WEATHERAPI_KEY
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

Open a second terminal.

Navigate to the frontend folder.

Run:

```bash
python -m http.server 5500
```

Open:

```
http://127.0.0.1:5500
```

---

## Security

The WeatherAPI key is **never exposed** to the browser.

Instead, all frontend requests are sent to the FastAPI backend, which securely communicates with WeatherAPI using environment variables stored in a `.env` file.

---

## Author

**Tarek Moustafa**

Software Engineering Student

GitHub:
https://github.com/TarekMoustafaElsayed

LinkedIn:
https://www.linkedin.com/in/tarek-moustafa-a29522329/

---
