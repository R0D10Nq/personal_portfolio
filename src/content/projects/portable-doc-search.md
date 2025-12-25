---
title: "Portable Doc Search"
subtitle: "Document Search Engine"
description: "Система полнотекстового поиска по PDF/MD документации. SQLite FTS5 с BM25 ранжированием."
tags: ["FastAPI", "SQLite FTS5", "Vue.js", "Typer CLI"]
tier: 3
featured: false
github: "https://github.com/R0D10Nq"
metrics:
  - label: "Документов"
    value: "500+"
  - label: "Response"
    value: "<200ms"
  - label: "Queries success"
    value: "90%"
highlights:
  - "PyPDF2 + markdown parsing pipeline"
  - "Custom BM25-подобное ранжирование"
  - "JWT авторизация + RBAC"
publishedAt: 2024-02-10
---

## Обзор проекта

Легковесная система полнотекстового поиска для технической документации. Portable решение на SQLite без внешних зависимостей.

## Функционал

- Индексация PDF, MD, DOCX файлов
- Full-text search с BM25 ранжированием
- Highlight результатов
- REST API + Vue.js frontend
- CLI для администрирования

## Архитектура

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Documents   │────▶│ Indexer     │────▶│ SQLite FTS5 │
│ (PDF/MD)    │     │ (PyPDF2)    │     │             │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                        ┌──────▼──────┐
                                        │  FastAPI    │
                                        │  Search API │
                                        └──────┬──────┘
                                               │
                                        ┌──────▼──────┐
                                        │  Vue.js     │
                                        │  Frontend   │
                                        └─────────────┘
```

## Технические решения

### Document Processing

```python
class DocumentProcessor:
    def process(self, file_path: Path) -> Document:
        if file_path.suffix == '.pdf':
            return self.process_pdf(file_path)
        elif file_path.suffix == '.md':
            return self.process_markdown(file_path)
        # ...
    
    def process_pdf(self, path: Path) -> Document:
        reader = PdfReader(path)
        text = '\n'.join(page.extract_text() for page in reader.pages)
        return Document(
            path=str(path),
            content=self.preprocess(text),
            metadata=self.extract_metadata(reader)
        )
```

### FTS5 Search

```sql
-- Create FTS5 table
CREATE VIRTUAL TABLE documents_fts USING fts5(
    title,
    content,
    path,
    tokenize='porter unicode61'
);

-- Search with ranking
SELECT 
    path,
    highlight(documents_fts, 1, '<mark>', '</mark>') as snippet,
    bm25(documents_fts) as rank
FROM documents_fts
WHERE documents_fts MATCH ?
ORDER BY rank
LIMIT 20;
```

### CLI Interface

```python
@app.command()
def index(path: Path, recursive: bool = True):
    """Index documents in directory"""
    files = list(path.rglob('*') if recursive else path.glob('*'))
    
    with Progress() as progress:
        task = progress.add_task("Indexing...", total=len(files))
        for file in files:
            processor.index(file)
            progress.advance(task)
```

## Результаты

- 500+ документов проиндексировано
- <200ms средний response time
- 90% запросов находят релевантные результаты
