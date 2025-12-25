---
title: "Portable DocSearch"
subtitle: "Document Search Engine"
description: "Система полнотекстового поиска для PDF и Markdown документов. FastAPI + SQLite FTS5 + Vue.js. Автономная работа без интернета."
tags: ["FastAPI", "SQLite FTS5", "Vue.js", "Typer CLI", "JWT", "Pydantic"]
tier: 2
featured: false
github: "https://github.com/R0D10Nq/portable_doc_search"
metrics:
  - label: "Поиск"
    value: "FTS5"
  - label: "Ранжирование"
    value: "BM25"
  - label: "Frontend"
    value: "Vue.js 3"
  - label: "CLI"
    value: "Typer"
highlights:
  - "SQLite FTS5 с BM25 ранжированием"
  - "PDF text extraction pipeline"
  - "Vue.js frontend (CDN-based, no build)"
  - "JWT аутентификация с HTTP-only cookies"
publishedAt: 2024-07-05
---

## Обзор

Современная система полнотекстового поиска для PDF и Markdown документов. Разработана для автономного использования с веб-интерфейсом и CLI инструментами.

## Ключевые особенности

- **Обработка документов** — индексация PDF и Markdown
- **Полнотекстовый поиск** — SQLite FTS5 с BM25
- **Умные сниппеты** — контекстная подсветка результатов
- **Веб-интерфейс** — Vue.js 3 (CDN, без сборки)
- **Аутентификация** — JWT с HTTP-only cookies
- **CLI инструменты** — Typer для управления
- **Автономность** — работа без интернета

## Технологический стек

**Backend:**

- Python 3.12+
- FastAPI + Uvicorn
- SQLAlchemy 2.x
- SQLite FTS5
- Pydantic v2

**Frontend:**

- Vue.js 3 (CDN)
- Jinja2 шаблоны

**CLI:**

- Typer

**Quality:**

- Ruff (линтинг)
- mypy (типизация)
- pytest (тесты)

## Быстрый старт

```bash
# Установка
python -m venv .venv
source .venv/bin/activate
pip install -e .[develop]

# Настройка
cp .env.example .env

# Инициализация БД
python -m docsearch.cli init-db

# Запуск
python -m docsearch.cli run
```

## Доступ

- **Веб-интерфейс:** <http://127.0.0.1:8000>
- **API документация:** <http://127.0.0.1:8000/docs>
- **Health check:** <http://127.0.0.1:8000/healthz>

## Структура

```
src/docsearch/
├── api/        # FastAPI routes
├── core/       # Конфигурация
├── db/         # Модели и миграции
├── services/   # Бизнес-логика
├── web/        # Templates + static
├── cli.py      # CLI интерфейс
└── main.py     # Entry point
```
