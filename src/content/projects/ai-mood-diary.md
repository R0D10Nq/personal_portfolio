---
title: "AI Mood Diary Bot"
subtitle: "Telegram Bot + ML"
description: "Telegram бот для отслеживания настроения с AI анализом через Google Gemini. Vue.js дашборд с визуализацией трендов."
tags: ["aiogram", "FastAPI", "Gemini API", "PostgreSQL", "Vue.js"]
tier: 2
featured: false
github: "https://github.com/R0D10Nq"
metrics:
  - label: "Пользователей"
    value: "2000+"
  - label: "AI Accuracy"
    value: "~78%"
  - label: "Активных дней"
    value: "30+"
highlights:
  - "Webhook-based Telegram deployment"
  - "Корреляционный анализ настроения"
  - "AES-256 шифрование данных"
publishedAt: 2024-05-20
---

## Обзор проекта

Telegram бот для ежедневного отслеживания настроения с AI-powered анализом эмоций. Помогает выявить паттерны и триггеры настроения.

## Функционал

### Telegram Bot

- Интерактивный UI с inline keyboards
- Ежедневные напоминания
- Быстрый ввод настроения (1-10 + текст)
- История записей

### AI Analysis

```python
async def analyze_mood(text: str) -> MoodAnalysis:
    response = await gemini.generate_content(
        f"""Проанализируй текст и определи:
        1. Основную эмоцию (радость, грусть, тревога, спокойствие)
        2. Интенсивность (1-10)
        3. Возможные триггеры
        
        Текст: {text}"""
    )
    return parse_analysis(response)
```

### Web Dashboard

- Vue.js 3 + Chart.js
- Графики настроения
- Heat maps по дням
- Корреляции с внешними факторами

## Архитектура

```
┌─────────────┐     ┌─────────────┐
│  Telegram   │────▶│  aiogram    │
│  Users      │     │  Bot        │
└─────────────┘     └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  FastAPI    │
                    │  Backend    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌───▼───┐ ┌──────▼──────┐
       │ PostgreSQL  │ │ Redis │ │ Gemini API  │
       └─────────────┘ └───────┘ └─────────────┘
```

## Privacy & Security

### Data Protection

```python
from cryptography.fernet import Fernet

class MoodEncryptor:
    def encrypt(self, text: str) -> bytes:
        return self.fernet.encrypt(text.encode())
    
    def decrypt(self, encrypted: bytes) -> str:
        return self.fernet.decrypt(encrypted).decode()
```

- AES-256 для чувствительных данных
- Локальное хранение (no cloud)
- GDPR-compliant data export

### Rate Limiting

```python
# Gemini API rate limiting
rate_limiter = RateLimiter(
    max_requests=60,
    time_window=60  # per minute
)
```

## Корреляционный анализ

### Внешние факторы

- Погода (OpenWeather API)
- День недели
- Время суток
- Календарные события

### Insights

```python
def find_correlations(user_id: int) -> List[Insight]:
    moods = get_user_moods(user_id, days=30)
    weather = get_weather_history(user_id, days=30)
    
    correlation = pearsonr(moods.scores, weather.conditions)
    
    if correlation > 0.5:
        return [Insight(
            type="weather",
            message="Ваше настроение коррелирует с погодой"
        )]
```

## Результаты

- 30+ дней активного использования
- ~78% accuracy AI анализа
- Выявлены паттерны настроения
- Пользователи отмечают улучшение self-awareness
