---
title: "Live Hints"
subtitle: "Desktop AI Interview Assistant"
description: "Windows desktop overlay для транскрипции системного звука и генерации AI-подсказок в реальном времени. Локальный STT через faster-whisper + LLM через Ollama."
tags: ["Electron", "Python", "faster-whisper", "Ollama", "WebSocket", "CUDA"]
tier: 1
featured: true
github: "https://github.com/R0D10Nq/live-hints"
metrics:
  - label: "STT латентность"
    value: "~300ms"
  - label: "LLM TTFT"
    value: "2-3s"
  - label: "End-to-End"
    value: "3-4s"
  - label: "Провайдеров"
    value: "10+"
highlights:
  - "WASAPI loopback захват системного аудио"
  - "GPU-accelerated Whisper distil-large-v3"
  - "LRU кэш подсказок для мгновенных повторов"
  - "Поддержка 10+ LLM провайдеров (OpenAI, Gemini, GigaChat, Ollama)"
publishedAt: 2024-12-01
---

## Обзор

Desktop приложение для real-time транскрипции системного аудио и генерации AI-подсказок. Полностью локальное решение с опциональными облачными провайдерами.

## Возможности

- Захват системного аудио через WASAPI loopback
- Realtime транскрипция через faster-whisper distil-large-v3 (локально на GPU)
- Streaming генерация подсказок через LLM с TTFT 2-3 секунды
- Markdown рендеринг подсказок
- Классификация вопросов (experience / technical / general)
- Always-on-top overlay поверх всех приложений
- История сессий с сохранением транскриптов

## Метрики производительности

| Метрика | Значение |
| --- | --- |
| STT латентность | ~300ms (distil-large-v3) |
| LLM TTFT | 2-3s (streaming) |
| LLM total | 18-25s |
| End-to-end perceived | 3-4s |

## Поддерживаемые LLM провайдеры

**Локально:** Ollama (бесплатно, требует GPU)

**Облачные:** OpenAI, Gemini, Claude, OpenRouter

**Российские:** GigaChat Free/Max, Yandex Lite

## Технологии

- **Frontend:** Electron + HTML/CSS/JS
- **Backend:** Python, FastAPI, WebSocket
- **STT:** faster-whisper с CUDA acceleration
- **LLM:** Ollama / облачные API
- **Audio:** WASAPI loopback capture
