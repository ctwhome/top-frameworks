# Top Svelte - Modern SvelteKit Starter Template

A production-ready SvelteKit template with backend-agnostic authentication, designed for rapid experimentation with different BaaS providers and databases.

## ✨ Features

- **SvelteKit 2** with **Svelte 5** (latest runes API)
- **TailwindCSS 4** + **DaisyUI** for beautiful, responsive UI
- **Backend-Agnostic Auth** - Plug in any backend without changing UI code
- **TypeScript** - Full type safety
- **Docker Compose** - Ready for backend services
- **Bun** - Fast package manager and runtime
- **Production-Ready** - Authentication UI, validation, error handling

## 🎯 Purpose

This template is designed to:
- Experiment with different backends (Supabase, Firebase, PocketBase, custom APIs)
- Prototype applications quickly with pre-built auth UI
- Provide a clean, modular starting point for SvelteKit projects
- Demonstrate best practices for Svelte 5 and modern web development

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The app will be available at `http://localhost:5173`

### Docker Development

```bash
# Start with Docker Compose
docker compose up
```

The app will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── lib/
│   ├── auth/                  # Backend-agnostic auth module
│   │   ├── types.ts          # Auth interfaces & types
│   │   ├── store.svelte.ts   # Mock auth implementation
│   │   └── index.ts          # Public exports
│   ├── components/
│   │   └── ui/
│   │       ├── Login/        # Complete login/register UI
│   │       └── ...           # Other UI components
│   ├── stores/               # Application stores
│   └── utils/                # Utility functions
└── routes/                   # SvelteKit routes
    ├── +layout.svelte
    ├── +page.svelte
    └── register/
```

## 🔐 Authentication System

The auth system is fully decoupled from any specific backend:

### Current Implementation (Mock)

- In-memory authentication with localStorage persistence
- Accepts any email/password (8+ characters) for demo purposes
- Maintains auth state across page reloads
- Ready to be replaced with real backend

### How It Works

```typescript
// All auth UI components use this interface
import { authStore } from '$lib/auth';

// Login
const result = await authStore.login({ email, password });

// Register
const result = await authStore.register({
  email,
  password,
  passwordConfirm
});

// Logout
await authStore.logout();

// Check auth state
if (authStore.isAuthenticated) {
  console.log(authStore.user?.email);
}
```

### UI Components

Pre-built and ready to use:
- `LoginButton.svelte` - Login modal with dropdown menu
- `EmailLoginForm.svelte` - Email/password login form
- `RegisterForm.svelte` - Registration form with validation
- `LogOutButton.svelte` - Logout button
- Full form validation and error handling

## 🔌 Integrating Your Backend

To connect a real backend, implement the `AuthProvider` interface:

### 1. Install your backend SDK

```bash
# Example: Supabase
bun add @supabase/supabase-js

# Example: Firebase
bun add firebase

# Example: PocketBase
bun add pocketbase
```

### 2. Create your auth implementation

Create a new file `src/lib/auth/providers/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { AuthProvider, User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

class SupabaseAuthProvider implements AuthProvider {
  user = $state<User | null>(null);
  isAuthenticated = $derived(!!this.user);

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      return { success: false, error: error.message };
    }

    this.user = this.mapUser(data.user);
    return { success: true, user: this.user };
  }

  // Implement other methods...
}

export const authStore = new SupabaseAuthProvider();
```

### 3. Update the export

In `src/lib/auth/store.svelte.ts`, replace the mock implementation:

```typescript
// Replace MockAuthProvider with your implementation
export { authStore } from './providers/supabase';
```

**That's it!** All UI components continue to work without any changes.

## 🐳 Docker Compose

The `docker-compose.yml` is set up for easy backend integration:

```yaml
services:
  frontend:
    # SvelteKit dev server (already configured)

  # Add your backend here:
  backend:
    image: your-backend-image
    ports:
      - "3000:3000"
```

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

## 🎯 Use Cases

Perfect for:
- 🚀 **Rapid Prototyping** - Start building immediately with auth UI ready
- 🔬 **Backend Experimentation** - Test different BaaS providers easily
- 📚 **Learning** - Study modern SvelteKit patterns and architecture
- 🏗️ **Production Apps** - Solid foundation for real applications

## 🤝 Integration Examples

### Supabase
```bash
bun add @supabase/supabase-js
# Implement AuthProvider interface
# See integration guide above
```

### Firebase
```bash
bun add firebase
# Implement AuthProvider interface with Firebase Auth
```

### PocketBase
```bash
bun add pocketbase
# Implement AuthProvider interface with PocketBase SDK
```

### Custom API
```typescript
// Implement AuthProvider with fetch/axios
// Full control over your authentication flow
```

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

## 📚 Resources

- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/)
- [Bun Documentation](https://bun.sh/docs)

## 📄 License

MIT

---

**Ready to build something amazing!** 🎉
