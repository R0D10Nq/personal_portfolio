---
title: "Live Hints"
subtitle: "Desktop AI Interview Assistant"
description: "Windows overlay для real-time транскрипции аудио и генерации AI-подсказок. Локальный STT + LLM для полной приватности."
tags: ["Python", "PyQt5", "faster-whisper", "Ollama", "WebSocket"]
tier: 2
featured: true
github: "https://github.com/R0D10Nq"
metrics:
  - label: "STT Latency"
    value: "~300ms"
  - label: "LLM TTFT"
    value: "2-3s"
  - label: "End-to-End"
    value: "3-4s"
  - label: "Accuracy"
    value: "85%+"
highlights:
  - "WASAPI loopback + GPU-accelerated Whisper"
  - "Ollama LLM с streaming генерацией"
  - "LRU кэш: экономия 60% вычислений"
publishedAt: 2024-06-10
---

## Обзор проекта

Desktop приложение для real-time транскрипции системного аудио и генерации AI-подсказок на технических собеседованиях. Полностью локальное решение для приватности.

## Проблема

- Технические собеседования требуют быстрого доступа к информации
- Облачные решения небезопасны (утечка данных)
- Нужна низкая латентность (< 5 секунд end-to-end)

## Архитектура

```
┌─────────────────┐
│ System Audio    │
│ (WASAPI)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ STT Server      │────▶│ Transcript      │
│ (faster-whisper)│     │ Buffer          │
└─────────────────┘     └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │ LLM Server      │
                        │ (Ollama)        │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │ PyQt5 Overlay   │
                        │ (Always-on-top) │
                        └─────────────────┘
```

## Технические решения

### 1. Real-time STT

```python
# WebSocket streaming транскрипция
async def transcribe_stream(websocket: WebSocket):
    await websocket.accept()
    audio_buffer = bytearray()
    
    async for chunk in websocket.iter_bytes():
        audio_buffer.extend(chunk)
        
        if len(audio_buffer) >= CHUNK_SIZE:
            segments = model.transcribe(audio_buffer)
            for segment in segments:
                await websocket.send_json({
                    "text": segment.text,
                    "confidence": segment.confidence
                })
            audio_buffer.clear()
```

**Выбор модели:**

- faster-whisper distil-large-v3
- GPU acceleration (CUDA)
- ~300ms латентность

### 2. LLM Streaming

```python
# Ollama streaming response
async def generate_hint(question: str):
    cached = hint_cache.get(hash(question))
    if cached:
        return cached
    
    async for chunk in ollama.generate(
        model="llama3.2",
        prompt=build_prompt(question),
        stream=True
    ):
        yield chunk
    
    hint_cache.set(hash(question), full_response)
```

### 3. Always-on-top Overlay

- PyQt5 frameless window
- Transparent background
- Click-through support
- Drag to reposition

## Оптимизации

### LRU Cache

```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_hint_cached(question_hash: str):
    return generate_hint(question_hash)
```

- Экономия 60% вычислений
- Мгновенные повторы

### Memory Management

- Streaming audio processing
- Chunked transcription
- GPU memory optimization

## Результаты

| Метрика | Значение |
|---------|----------|
| STT Latency | ~300ms |
| LLM TTFT | 2-3s |
| Total End-to-End | 3-4s (perceived) |
| Cache Hit Rate | 40% |
| Transcription Accuracy | 85%+ |

## Lessons Learned

1. **GPU acceleration критична** для real-time STT
2. **LRU кэш** экономит 60% вычислений
3. **PyQt5 overlay** сложнее чем кажется (Z-order issues)

## Что бы сделал иначе

- PostgreSQL вместо SQLite для истории
- gRPC вместо WebSocket (lower latency)
- Electron вместо PyQt5 (лучший DX)
