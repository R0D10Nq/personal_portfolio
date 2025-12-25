---
title: "Django Landings Platform"
subtitle: "Multi-tenant платформа лендингов"
description: "Корпоративная платформа для массового создания и управления лендингами. 400+ активных лендингов, 2M+ посетителей/месяц."
tags: ["Django 5.x", "PostgreSQL", "Redis", "Celery", "Webpack"]
tier: 1
featured: true
metrics:
  - label: "Лендингов"
    value: "400+"
  - label: "Посетителей/мес"
    value: "2M+"
  - label: "Uptime"
    value: "99.9%"
  - label: "Response time"
    value: "<150ms"
highlights:
  - "Автоматизация создания: с 2-3 дней до 30 минут (-93%)"
  - "WebP pipeline + lazy loading: LCP -40%"
  - "A/B тестирование с preview: конверсия +15%"
publishedAt: 2024-01-15
---

## Обзор проекта

Корпоративная платформа для массового создания и управления лендингами в Sinergium. Разработал модульный монолит с микро-сервисной организацией, поддерживающий 170+ корпоративных клиентов.

## Архитектура

### Multi-tenant структура

- Каждый лендинг — отдельное Django app в `_sites/`
- 289 переиспользуемых UI-модулей в `modules/`
- Shared services: auth, uploads, analytics

### Ключевые компоненты

```python
# Пример management command для клонирования лендинга
class Command(BaseCommand):
    def handle(self, *args, **options):
        source = options['source']
        target = options['target']
        
        # Clone site structure
        self.clone_site_app(source, target)
        self.clone_templates(source, target)
        self.update_settings(target)
        
        # Auto-deploy
        self.run_migrations()
        self.collect_static()
        self.restart_services()
```

## Технические решения

### 1. Image Pipeline

- Автоматическая конвертация в WebP
- Lazy loading с Intersection Observer
- CDN интеграция для статики

**Результат:** LCP сократился на 40%, от 3.2s до 1.8s

### 2. A/B Testing Framework

- B-шаблоны с суффиксом `*-b.html`
- Переключение по UTM/feature flags
- Preview режим для контент-менеджеров

**Результат:** Uplift конверсии +7-14%

### 3. Caching Strategy

```python
# Составные ключи кеша
def get_cache_key(request, module):
    return f"{module}:{request.tenant}:{request.ab_variant}:{request.utm}"
```

- Redis для page cache и API responses
- Инвалидация после релиза
- Hit rate 70-85%

## Метрики производительности

| Метрика | Значение |
|---------|----------|
| RPS (peak) | 120-180 |
| P95 TTFB (cache hit) | 140-220ms |
| P95 TTFB (cache miss) | 300-600ms |
| Cache hit rate | 70-85% |

## Lessons Learned

- **Модульность окупается:** 289 модулей позволяют собирать новые лендинги за часы
- **A/B тесты критичны:** даже небольшие изменения дают измеримый uplift
- **Кеширование — must have:** Redis кеш снижает нагрузку на БД в разы
