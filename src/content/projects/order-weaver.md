---
title: "OrderWeaver"
subtitle: "Event-driven E-commerce Core"
description: "Микросервисная архитектура e-commerce на сагах. Orders, Payments, Inventory + Orchestrator. Kafka, Protobuf, OpenTelemetry."
tags: ["FastAPI", "Kafka", "PostgreSQL", "Protobuf", "OpenTelemetry", "Docker"]
tier: 1
featured: true
github: "https://github.com/R0D10Nq/order-weaver"
metrics:
  - label: "Сервисов"
    value: "4"
  - label: "Паттернов"
    value: "6+"
  - label: "Покрытие"
    value: "pytest"
  - label: "Трейсинг"
    value: "Jaeger"
highlights:
  - "Saga orchestration для распределённых транзакций"
  - "Outbox/Inbox patterns + идемпотентность"
  - "OpenTelemetry → Jaeger tracing"
  - "Protobuf контракты между сервисами"
publishedAt: 2024-11-15
---

## Обзор

Проект демонстрирует распределённые транзакции через паттерн саг (orchestration), обмен событиями между микросервисами и современные практики observability.

## Архитектура

**Микросервисы:**

- `orders` — управление заказами
- `payments` — обработка платежей
- `inventory` — управление складом
- `orchestrator` — координация саг

**Инфраструктура:**

- Kafka/Redpanda для событий
- PostgreSQL (per-service databases)
- Protobuf контракты в `proto/`
- OpenTelemetry → Jaeger

## Паттерны

- **Saga Orchestration** — координация через отдельный сервис
- **Outbox/Inbox** — транзакционные сообщения
- **Idempotency** — защита от дублей
- **Dead Letter Queues** — обработка ошибок
- **Compensating Transactions** — откат при сбоях

## Быстрый старт

```bash
docker compose up -d --build

# Health checks
curl http://localhost:8001/health  # Orders
curl http://localhost:8002/health  # Payments
curl http://localhost:8003/health  # Inventory
curl http://localhost:8004/health  # Orchestrator

# Redpanda Console: http://localhost:8081
# Jaeger UI: http://localhost:16686
```

## E2E тест

```bash
make e2e
# или
curl -X POST http://localhost:8001/orders \
  -H 'Content-Type: application/json' \
  -d '{"order_id":"o-1","user_id":"u-1","amount":123.45}'
```

## Технологии

- **Backend:** FastAPI + SQLAlchemy + Alembic
- **Messaging:** Kafka/Redpanda + Protobuf
- **Database:** PostgreSQL (per-service)
- **Observability:** OpenTelemetry → Jaeger, Prometheus
- **DevOps:** Docker Compose, Makefile
