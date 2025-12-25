---
title: "PulseCourier"
subtitle: "Notification Platform"
description: "Единая платформа уведомлений (email/SMS/push/Slack/Telegram) с шаблонами, резервным провайдингом, очередями, ретраями и идемпотентностью."
tags: ["FastAPI", "Celery", "Redis", "Jinja2", "Prometheus", "OpenTelemetry"]
tier: 2
featured: true
github: "https://github.com/R0D10Nq/pulse-courier"
metrics:
  - label: "Каналов"
    value: "5+"
  - label: "Шаблоны"
    value: "Jinja2"
  - label: "Очереди"
    value: "Celery"
  - label: "Метрики"
    value: "Prometheus"
highlights:
  - "Multi-provider система с fallback механизмом"
  - "Template engine с персонализацией (Jinja2)"
  - "Queue-based processing с dead letter queues"
  - "Idempotency через Redis setnx"
publishedAt: 2024-08-10
---

## Обзор

PulseCourier — единая платформа для отправки уведомлений через различные каналы с поддержкой шаблонов, резервных провайдеров и гарантией доставки.

## Возможности

- **Шаблоны (Jinja2)** — персонализированные сообщения
- **Multi-provider** — резервный обход при сбоях
- **Очереди (Celery)** — асинхронная обработка
- **Идемпотентность** — защита от дублей (Redis setnx)
- **Observability** — Prometheus, Sentry, OpenTelemetry

## Каналы уведомлений

| Канал | Статус |
| --- | --- |
| Email | SES, SendGrid (roadmap) |
| SMS | Twilio (roadmap) |
| Push | FCM (roadmap) |
| Slack | Webhook |
| Telegram | Bot API |

## Архитектура

```
app/
├── main.py          # FastAPI приложение
├── api/routes.py    # API эндпоинты
├── services/        # Бизнес-логика + идемпотентность
├── worker/          # Celery задачи
├── providers/       # Абстракция провайдеров
├── core/            # Конфиг, логирование, Redis
└── db/              # SQLAlchemy (Alembic planned)
```

## API

```bash
# Health check
GET /api/v1/health

# Отправка уведомления
POST /api/v1/notifications/send
{
  "channel": "email",
  "recipient": "user@example.com",
  "template": "welcome",
  "data": {"name": "John"}
}
```

## Быстрый старт

```bash
docker compose up --build
open http://localhost:8000/docs
```

## Roadmap

- Реальные провайдеры: SES, SendGrid, Twilio, FCM
- Ретраи с exponential backoff + DLQ
- Вебхуки статусов доставки
- Планирование отправок (ETAs/Beat)
- Rate limiting на тенанта
