---
title: "FoodRadar"
subtitle: "Restaurant Discovery Platform"
description: "Платформа для поиска ресторанов с real-time отслеживанием заказов, курьерской системой и интеграцией Stripe. Django + PostgreSQL + Redis + WebSocket."
tags: ["Django", "PostgreSQL", "Redis", "WebSocket", "Stripe", "PostGIS", "Celery"]
tier: 1
featured: true
github: "https://github.com/R0D10Nq/FoodRadar"
metrics:
  - label: "Real-time"
    value: "WebSocket"
  - label: "Геолокация"
    value: "PostGIS"
  - label: "Платежи"
    value: "Stripe"
  - label: "Роли"
    value: "3"
highlights:
  - "Django Channels для real-time WebSocket updates"
  - "PostGIS интеграция для геопространственных запросов"
  - "Stripe payments с webhook handling"
  - "Multi-role система (customers/couriers/restaurants)"
publishedAt: 2024-09-15
---

## Обзор

Современная платформа для поиска и обзора ресторанов с продвинутыми возможностями поиска, пользовательскими отзывами и рекомендациями в реальном времени.

## Ключевые особенности

- **Управление ресторанами** — полная система управления меню
- **Real-time отслеживание** — WebSocket обновления статуса заказа
- **Геолокационные сервисы** — PostGIS для поиска по местоположению
- **Курьерская система** — отслеживание доставки
- **Обработка платежей** — Stripe интеграция
- **Система отзывов** — рейтинги с модерацией
- **Аналитическая панель** — бизнес-аналитика

## Технологический стек

**Backend:**

- Django 4.2+
- Django REST Framework
- Django Channels (WebSocket)
- Celery (async tasks)
- Redis (кэш + брокер)

**База данных:**

- PostgreSQL 15+
- PostGIS (геопространственное расширение)

**Платежи и сервисы:**

- Stripe (платежи)
- Google Maps API (карты)
- AWS S3 (хранение файлов)

**DevOps:**

- Docker & Docker Compose
- pytest + factory_boy (тесты)

## Архитектура ролей

| Роль | Возможности |
| --- | --- |
| Customer | Поиск, заказы, отзывы |
| Restaurant | Управление меню, заказами |
| Courier | Доставка, отслеживание |

## Сложные фичи

- Complex business logic: order management, delivery tracking
- Performance optimization: Redis caching, database indexing
- JWT аутентификация с role-based permissions
- Rate limiting и CORS handling
