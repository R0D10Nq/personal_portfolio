# Backend Samurai Portfolio

Персональное портфолио Python Backend Developer в стиле cyberpunk-samurai.

## Технологии

- **Frontend**: Astro 4.x + Svelte islands + Tailwind CSS
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions (автодеплой на push)

## Запуск локально

```bash
# Установка зависимостей
npm install

# Dev сервер
npm run dev

# Сборка для production
npm run build

# Preview production build
npm run preview
```

## Структура проекта

```
src/
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── About.astro
│   ├── Projects.astro
│   ├── Skills.astro
│   ├── Contact.astro
│   └── Footer.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
└── styles/
    └── global.css
```

## Деплой

Автоматический деплой на GitHub Pages при push в `main` ветку через GitHub Actions.

## Автор

Шевцов Родион - Python Backend Developer

- Email: <q@r0d10n.ru>
- Telegram: @qr0d10n
- GitHub: github.com/R0D10Nq
