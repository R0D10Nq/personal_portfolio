---
title: "AI Mood Diary Bot"
subtitle: "Telegram Bot + AI Analytics"
description: "Интеллектуальный Telegram бот для отслеживания настроения с анализом через Google Gemini AI и веб-дашбордом на Vue.js."
tags: ["FastAPI", "aiogram", "Vue.js", "Gemini AI", "PostgreSQL", "Redis", "Docker"]
tier: 1
featured: true
github: "https://github.com/R0D10Nq/ai-mood-diary-bot"
metrics:
  - label: "AI Engine"
    value: "Gemini"
  - label: "Frontend"
    value: "Vue.js 3"
  - label: "База"
    value: "PostgreSQL"
  - label: "Кэш"
    value: "Redis"
highlights:
  - "Telegram бот с интерактивными inline keyboards"
  - "AI анализ эмоций через Google Gemini"
  - "Vue.js 3 дашборд с Chart.js визуализацией"
  - "Docker Compose для dev/prod окружений"
publishedAt: 2024-10-20
---

## Обзор

AI Mood Diary Bot — современное приложение для отслеживания эмоционального состояния. Сочетает удобный Telegram бот, мощный веб-интерфейс и AI для анализа настроения.

## Возможности

### Telegram Bot

- Интерактивное ведение дневника через чат
- Умные напоминания
- Быстрая статистика
- AI анализ в реальном времени
- Экспорт данных

### Веб-интерфейс

- Детальная аналитика
- Интерактивные графики (Chart.js)
- Сравнение периодов
- Настраиваемые дашборды
- История записей с фильтрацией

### AI Анализ (Google Gemini)

- Определение эмоционального тона
- Выявление паттернов
- Персональные рекомендации
- Прогнозирование трендов
- Корреляционный анализ

## Технологический стек

**Backend:**

- FastAPI (веб-фреймворк)
- SQLAlchemy 2.0+ (ORM)
- PostgreSQL 15+ (база данных)
- Redis 7+ (кэширование)
- python-telegram-bot 20.7+
- Google Gemini AI
- Alembic (миграции)

**Frontend:**

- Vue.js 3
- Vuetify 3
- Pinia (state management)
- Chart.js (графики)
- Vite (сборка)

**DevOps:**

- Docker & Docker Compose
- GitHub Actions CI/CD
- Makefile для автоматизации

## Запуск

```bash
# Docker (рекомендуется)
docker compose up -d

# Или локально
cp .env.example .env
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```
