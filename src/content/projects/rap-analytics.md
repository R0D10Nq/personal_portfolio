---
title: "RAP Analytics Platform"
subtitle: "Рекламно-аналитическая платформа"
description: "Highload платформа для управления рекламными кампаниями. ETL pipeline для 15+ рекламных платформ, 100GB+ данных/день."
tags: ["FastAPI", "PostgreSQL", "ClickHouse", "Celery", "Redis"]
tier: 1
featured: true
metrics:
  - label: "Requests/min"
    value: "10K+"
  - label: "Uptime"
    value: "99.9%"
  - label: "P95 Response"
    value: "<100ms"
  - label: "Данных/день"
    value: "100GB+"
highlights:
  - "ETL для 15+ рекламных API (Google, Facebook, Yandex)"
  - "Время отчетов: 5 минут → 3 секунды"
  - "RBAC + client isolation для 500+ клиентов"
publishedAt: 2024-03-20
---

## Обзор проекта

Highload платформа для управления рекламными кампаниями и аналитикой. Обрабатывает $10M+ рекламного бюджета ежемесячно для 500+ клиентов.

## Архитектура

### Event-driven Design

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ External    │────▶│ ETL Workers  │────▶│ PostgreSQL  │
│ APIs (15+)  │     │ (Celery)     │     │ (Partitioned)│
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐     ┌─────────────┐
                    │ Redis Cache  │────▶│ FastAPI     │
                    │              │     │ Endpoints   │
                    └──────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │ ClickHouse  │
                                        │ (Analytics) │
                                        └─────────────┘
```

## Ключевые компоненты

### 1. ETL Pipeline

```python
# Async ETL для рекламных платформ
class GoogleAdsETL(BaseETL):
    async def extract(self, client_id: str, date_range: DateRange):
        async with self.rate_limiter:
            return await self.client.get_campaigns(
                client_id=client_id,
                date_range=date_range
            )
    
    async def transform(self, raw_data: dict):
        return UnifiedCampaign(
            source='google_ads',
            spend=raw_data['cost_micros'] / 1_000_000,
            impressions=raw_data['impressions'],
            clicks=raw_data['clicks']
        )
    
    async def load(self, data: UnifiedCampaign):
        await self.repository.upsert(data)
```

### 2. Real-time Analytics

- FastAPI endpoints с async PostgreSQL
- Агрегация по временным окнам (1h/1d/7d/30d)
- Materialized views для частых запросов

### 3. RBAC & Multi-tenancy

```python
# Client isolation middleware
class TenantMiddleware:
    async def __call__(self, request: Request, call_next):
        tenant_id = get_tenant_from_jwt(request)
        request.state.tenant = tenant_id
        
        # Inject tenant filter into all queries
        with tenant_context(tenant_id):
            response = await call_next(request)
        
        return response
```

## Оптимизации

### Database

- Партиционирование по месяцам
- Partial indexes для hot queries
- Connection pooling через pgbouncer

### Caching

- Redis для API responses (TTL 5-60 min)
- Query result caching
- Rate limiting через Redis

## Результаты

| До | После |
|----|-------|
| Отчеты за 5 минут | Отчеты за 3 секунды |
| Ручной сбор данных | Автоматический ETL |
| Spreadsheets | Real-time дашборды |

## Security

- Zero security incidents за 1.5 года
- JWT + role-based permissions
- Audit logging для всех операций
- Client data isolation
