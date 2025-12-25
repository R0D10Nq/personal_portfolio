---
title: "Order Management System"
subtitle: "Event-driven E-commerce"
description: "Микросервисная архитектура для e-commerce с Saga Pattern, CQRS и распределенными транзакциями."
tags: ["FastAPI", "Kafka", "PostgreSQL", "OpenTelemetry", "Protobuf"]
tier: 2
featured: false
github: "https://github.com/R0D10Nq"
metrics:
  - label: "Success Rate"
    value: "99.7%"
  - label: "Сервисов"
    value: "4"
  - label: "Incidents"
    value: "0"
  - label: "Scaling"
    value: "Horizontal"
highlights:
  - "Saga orchestration для распределенных транзакций"
  - "Outbox/Inbox patterns + идемпотентность"
  - "Jaeger tracing + Prometheus metrics"
publishedAt: 2024-04-15
---

## Обзор проекта

Event-driven микросервисная архитектура для e-commerce. Реализация современных паттернов распределенных систем: Saga, CQRS, Event Sourcing.

## Архитектура

```
┌─────────┐     ┌─────────────┐     ┌─────────────┐
│ Orders  │◄───▶│ Orchestrator│◄───▶│ Payments    │
│ Service │     │             │     │ Service     │
└─────────┘     └─────────────┘     └─────────────┘
     │                 │                   │
     │          ┌──────┴──────┐           │
     │          │   Kafka     │           │
     │          │  (Events)   │           │
     │          └──────┬──────┘           │
     │                 │                   │
     ▼                 ▼                   ▼
┌─────────────────────────────────────────────┐
│              Inventory Service               │
└─────────────────────────────────────────────┘
```

## Паттерны

### Saga Orchestration

```python
class OrderSaga:
    async def execute(self, order: Order):
        try:
            # Step 1: Reserve inventory
            await self.inventory.reserve(order.items)
            
            # Step 2: Process payment
            await self.payment.charge(order.total)
            
            # Step 3: Confirm order
            await self.orders.confirm(order.id)
            
        except PaymentFailed:
            # Compensating transaction
            await self.inventory.release(order.items)
            await self.orders.cancel(order.id)
```

### Outbox Pattern

```python
# Transactional outbox
async def create_order(self, order: OrderCreate):
    async with self.db.transaction():
        # Save order
        db_order = await self.repo.create(order)
        
        # Save event to outbox (same transaction)
        await self.outbox.save(OrderCreatedEvent(
            order_id=db_order.id,
            items=order.items
        ))
    
    return db_order
```

### Idempotency

```python
@idempotent(key=lambda msg: msg.event_id)
async def handle_payment_completed(self, msg: PaymentCompleted):
    await self.orders.mark_paid(msg.order_id)
```

## Observability

### Distributed Tracing

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

@tracer.start_as_current_span("process_order")
async def process_order(self, order_id: str):
    span = trace.get_current_span()
    span.set_attribute("order.id", order_id)
    # ... processing
```

### Metrics

- Order processing time (p50, p95, p99)
- Success/failure rates
- Queue depths
- Service health

## Результаты

| Метрика | Значение |
|---------|----------|
| Transaction Success Rate | 99.7% |
| Data Inconsistency | 0 incidents |
| Average Processing Time | 450ms |
| Peak Throughput | 500 orders/min |

## Tech Stack

- **Services:** FastAPI + SQLAlchemy
- **Messaging:** Kafka/Redpanda + Protobuf
- **Database:** PostgreSQL (per-service)
- **Observability:** OpenTelemetry → Jaeger
- **Metrics:** Prometheus + Grafana
