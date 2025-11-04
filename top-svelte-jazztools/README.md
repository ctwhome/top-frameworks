# Top Svelte - Jazz.tools Todo App

A production-ready SvelteKit application with **Jazz.tools** integration, featuring a complete todo list application with real-time sync, offline support, and collaborative features.

## ✨ Features

- **SvelteKit 2** with **Svelte 5** (latest runes API)
- **Jazz.tools** - Real-time collaborative database as a service
- **TailwindCSS 4** + **DaisyUI** for beautiful, responsive UI
- **TypeScript** - Full type safety
- **Bun** - Fast package manager and runtime
- **Production-Ready** - Complete todo app with all CRUD operations

## 🎯 Jazz.tools Integration

This project showcases Jazz.tools as the backend, providing:

- **Real-time Sync** - Changes appear instantly across all devices
- **Offline-First** - Work offline, sync automatically when online
- **End-to-End Encryption** - Data encrypted by default
- **Automatic Conflict Resolution** - Jazz CRDTs handle concurrent edits
- **No Backend Code** - Jazz handles all server-side logic
- **Built-in Authentication** - Passkey/passphrase based auth

## 📋 Todo App Features

The application includes a full-featured todo list with:

- ✅ **Add/Edit/Delete** todos
- ✅ **Mark complete/incomplete**
- ✅ **Priority levels** (low, medium, high)
- ✅ **Due dates** with overdue detection
- ✅ **Categories/tags** for organization
- ✅ **Nested subtasks** for complex todos
- ✅ **Filtering** (all/active/completed)
- ✅ **Real-time sync** across devices
- ✅ **Offline support** with automatic sync

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+** (Jazz requires Node 20 or later)
- **Bun** (package manager)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd top-svelte-jazztools
```

2. **Install dependencies**
```bash
bun install
```

3. **Configure environment**

Create a `.env` file (already configured):
```bash
PUBLIC_JAZZ_API_KEY=top-svelte@ctwhome.com  # Temporary key for development
```

For production, get a free API key at [dashboard.jazz.tools](https://dashboard.jazz.tools)

4. **Start development server**
```bash
bun run dev
```

The app will be available at `http://localhost:5173`

### First Run

1. Open the app in your browser
2. Click "Login" in the header
3. Enter any email/password (8+ characters) to create an account
4. Jazz automatically creates your account and syncs data
5. Start adding todos!

### Test Real-time Sync

1. Open the app in two browser tabs
2. Add/edit a todo in one tab
3. Watch it appear instantly in the other tab 🎉

## 🏗️ Project Structure

```
src/
├── lib/
│   ├── jazz/
│   │   └── schema.ts         # Jazz CoValue schemas (Todo, Subtask, Account)
│   ├── auth/
│   │   ├── types.ts          # Auth interfaces
│   │   ├── providers/
│   │   │   └── jazz.ts       # Jazz auth adapter
│   │   └── store.svelte.ts   # Auth store (exports Jazz provider)
│   ├── components/
│   │   ├── jazz/
│   │   │   └── JazzProvider.svelte  # Jazz provider wrapper
│   │   ├── todos/            # Todo components
│   │   │   ├── TodoList.svelte
│   │   │   ├── TodoItem.svelte
│   │   │   ├── AddTodo.svelte
│   │   │   ├── TodoFilters.svelte
│   │   │   └── SubtaskList.svelte
│   │   └── ui/               # Other UI components
│   ├── stores/               # Application stores
│   └── utils/                # Utility functions
└── routes/                   # SvelteKit routes
    ├── +layout.svelte        # Wraps app with JazzProvider
    ├── +page.svelte          # Home page with todo app
    └── ...
```

## 🔐 Authentication with Jazz

Jazz provides built-in authentication that's seamlessly integrated:

### How It Works

1. **Account Creation** - Jazz automatically creates an account on first login
2. **Passkey/Passphrase** - Secure authentication without traditional passwords
3. **Cross-Device Sync** - Login from any device and access your data
4. **Local-First** - Works offline, syncs when online

### Auth Adapter

The project includes a `JazzAuthProvider` that implements the `AuthProvider` interface, allowing existing auth UI components to work without modification:

```typescript
// Import the Jazz-powered auth store
import { authStore } from '$lib/auth';

// Same API as before, now powered by Jazz
const result = await authStore.login({ email, password });
```

### UI Components

All existing auth components work with Jazz:
- `LoginButton.svelte` - Login modal
- `EmailLoginForm.svelte` - Login form
- `RegisterForm.svelte` - Registration form
- `LogOutButton.svelte` - Logout button

## 🎨 Jazz Schema Design

The todo app uses Jazz's CoValue schemas for collaborative data:

```typescript
// src/lib/jazz/schema.ts

// Todo item with all features
export const Todo = co.map({
  title: z.string(),
  completed: z.boolean(),
  priority: z.literal(['low', 'medium', 'high']),
  dueDate: z.optional(z.date()),
  category: z.optional(z.string()),
  createdAt: z.date(),
  subtasks: co.optional(SubtaskList)
});

// Account with todo list
export const TodoAccount = co
  .account({
    root: TodoAccountRoot,
    profile: co.profile({ name: z.string() })
  })
  .withMigration((account) => {
    // Initialize todos list on first login
    if (!account.$jazz.has('root')) {
      account.$jazz.set('root', { todos: [] });
    }
  });
```

### Jazz Concepts

- **CoMap** - Like a JavaScript object, for structured data
- **CoList** - Like an array, for ordered lists
- **CRDTs** - Conflict-free replicated data types that sync automatically
- **Reactive** - Changes propagate instantly via Svelte 5 runes

## 📊 Jazz Cloud

This project uses Jazz Cloud for sync and storage:

- **Free tier available** - Perfect for development and small apps
- **Auto-scaling** - Jazz handles all infrastructure
- **Global CDN** - Fast sync worldwide
- **Self-hosting option** - Can host your own Jazz mesh if needed

Get an API key at [dashboard.jazz.tools](https://dashboard.jazz.tools) for production use.

## 📝 Available Scripts

```bash
# Development
bun run dev          # Start dev server

# Building
bun run build        # Build for production
bun run preview      # Preview production build

# Code Quality
bun run check        # Type check
bun run lint         # Lint code
bun run format       # Format code with Prettier
```

## 🎨 Styling

This template uses:
- **TailwindCSS 4** - Utility-first CSS
- **DaisyUI** - Beautiful component library
- **Custom Theme** - Pre-configured with brand colors
- **Responsive Design** - Mobile-first approach

### Theme Configuration

The custom "ctw" theme is configured in `tailwind.config.js`. Modify colors, fonts, and more to match your brand.

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure for your backend:

```bash
cp .env.example .env
```

Examples provided for:
- Custom APIs
- Supabase
- Firebase
- PocketBase

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| SvelteKit 2 | Full-stack framework |
| Svelte 5 | UI components with runes |
| TailwindCSS 4 | Styling |
| DaisyUI | UI components |
| TypeScript | Type safety |
| Bun | Package manager & runtime |
| Docker | Containerization |

## 🎯 Key Concepts Demonstrated

This project showcases:

- ✅ **Local-First Architecture** - Data lives on device, syncs in background
- ✅ **Real-Time Collaboration** - See changes from other devices instantly
- ✅ **Offline Support** - Full functionality without internet
- ✅ **Svelte 5 Runes** - Modern reactive programming with `$state`, `$derived`, `$effect`
- ✅ **TypeScript Safety** - Full type checking for Jazz schemas
- ✅ **Component Architecture** - Modular, reusable UI components
- ✅ **DaisyUI Design** - Beautiful UI with minimal custom CSS

## 🧪 Testing the App

### Test Real-Time Sync

1. Open the app in two browser windows side-by-side
2. Add a todo in one window
3. Watch it appear instantly in the other! ⚡

### Test Offline Support

1. Open browser DevTools → Network tab
2. Toggle "Offline" mode
3. Add/edit todos - they work offline!
4. Toggle back online - changes sync automatically 🔄

### Test Subtasks

1. Add a todo
2. Click "▶ Subtasks (0)" to expand
3. Add subtasks within the todo
4. Check them off as you complete them ✓

## 📖 Architecture Principles

- **Modularity** - Each feature is self-contained
- **Type Safety** - TypeScript throughout
- **Backend Agnostic** - Swap backends without touching UI
- **Developer Experience** - Fast, modern tooling
- **Production Ready** - Error handling, validation, best practices

## 🚦 Next Steps

1. **Try the Auth UI** - Click login and test with any email/password (8+ chars)
2. **Choose Your Backend** - Pick your favorite BaaS or API
3. **Implement AuthProvider** - Follow the integration guide above
4. **Start Building** - Add your routes, components, and features

## 🔧 Development

```bash
# Type checking
bun run check

# Linting
bun run lint

# Format code
bun run format

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📚 Resources

- [Jazz.tools Documentation](https://jazz.tools/docs)
- [Jazz.tools Examples](https://github.com/garden-co/jazz/tree/main/examples)
- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/)

## 🤝 Contributing

This is a demonstration project showcasing Jazz.tools with SvelteKit. Feel free to use it as a starting point for your own projects!

## 📄 License

MIT

---

**Ready to build something amazing!** 🎉
