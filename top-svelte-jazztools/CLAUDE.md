# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a production-ready SvelteKit template integrated with **Jazz.tools** for collaborative, local-first data sync and authentication. The template uses **Svelte 5** (runes API), **TailwindCSS 4**, **DaisyUI**, and **Bun** as the package manager.

**Backend: Jazz.tools** - A collaborative framework providing:
- Built-in authentication and user management
- Real-time data sync across clients
- Local-first architecture with offline support
- Collaborative data structures (CoMap, CoList, CoStream)
- Conflict-free replicated data types (CRDTs)

Key characteristics:
- **Jazz-integrated design**: UI components designed to work with Jazz's reactive data structures
- **Multi-language support**: Uses Paraglide for i18n with 5 supported languages (en, es, nl, de, fr)
- **Production-ready auth UI**: Complete authentication flows ready for Jazz integration
- **Custom theming**: Custom "ctw" DaisyUI theme with dark mode styling

## Common Commands

### Development
```bash
bun install              # Install dependencies
bun run dev              # Start dev server (port 5173)
docker compose up        # Run app in Docker container
```

### Code Quality
```bash
bun run check            # Type check with svelte-check
bun run check:watch      # Type check in watch mode
bun run lint             # Lint and format check
bun run format           # Format code with Prettier
```

### Build and Deploy
```bash
bun run build            # Build for production
bun run preview          # Preview production build
```

**Note**: This project uses Bun exclusively - do not use npm or yarn commands.

## Architecture

### Authentication System (Core Design Pattern)

The authentication system demonstrates the project's **interface-driven architecture**:

1. **Abstract Interface** (`src/lib/auth/types.ts`):
   - `AuthProvider` interface defines contract for all auth implementations
   - `User`, `LoginCredentials`, `RegisterCredentials`, `AuthResponse` types
   - Backend-agnostic - works with any provider

2. **Mock Implementation** (`src/lib/auth/store.svelte.ts`):
   - `MockAuthProvider` implements `AuthProvider` interface
   - Uses Svelte 5 runes: `$state`, `$derived`
   - localStorage persistence with browser checks
   - Accepts any credentials for demo (password must be 8+ chars)

3. **Public API** (`src/lib/auth/index.ts`):
   - Single export point for auth functionality
   - UI components import from here only

4. **Pre-built UI Components** (`src/lib/components/ui/Login/`):
   - `LoginButton.svelte` - Dropdown menu with login modal
   - `EmailLoginForm.svelte` - Email/password login
   - `RegisterForm.svelte` - Registration with validation
   - `LogOutButton.svelte` - Logout functionality
   - All components use only the `AuthProvider` interface

**Current Status**: Mock implementation for development. See "Jazz.tools Integration" section below for replacing with Jazz authentication. No UI changes required when switching to Jazz.

### Internationalization (i18n)

- **Paraglide plugin** configured in `vite.config.ts`
- Messages stored in `locale/messages/*.json` (5 languages)
- Generated code in `src/lib/paraglide/` (auto-generated, don't edit)
- Usage in components: `import { m } from '$lib/i18n/messages'`
- Locale switching via `locale.store.ts`

### Styling Architecture

1. **TailwindCSS 4** with new `@import` syntax (`src/app.css`)
2. **DaisyUI plugins** configured inline in app.css:
   ```css
   @plugin "daisyui" { themes: all; }
   @plugin "daisyui/theme" { name: 'ctw'; ... }
   ```
3. **Custom "ctw" theme**: Dark mode by default with custom brand colors
   - Primary: #ffb83d (orange/gold)
   - Base: #171717 (dark background)
   - All DaisyUI color variables customized

4. **Additional plugins**:
   - `@tailwindcss/typography` for prose styling
   - `@tailwindcss/forms` for form elements
   - `@tailwindcss/container-queries`

### Component Patterns (Svelte 5)

All components use **Svelte 5 runes** syntax:

```svelte
<script lang="ts">
  // Props with TypeScript
  interface Props {
    children?: import('svelte').Snippet;
    data: DataType;
  }

  let { children, data }: Props = $props();

  // State
  let count = $state(0);

  // Derived state
  let doubled = $derived(count * 2);

  // Effects
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>

<!-- Render snippets -->
{#if children}
  {@render children()}
{/if}
```

### Store Patterns

Two store approaches coexist in the codebase:

1. **Svelte 5 runes classes** (recommended for new code):
   - Used in `src/lib/auth/store.svelte.ts`
   - Class-based with `$state`, `$derived`
   - File extension: `.svelte.ts`

2. **Traditional Svelte stores**:
   - Used in `src/lib/stores/*.ts`
   - `writable`, `derived` from 'svelte/store'
   - Existing examples: `menu.store.ts`, `locale.store.ts`

### Layout Structure

Main layout (`src/routes/+layout.svelte`):
- Grid layout: `grid-rows-[auto_1fr]` (header + main content)
- Header with frosted glass effect (backdrop-filter blur)
- Responsive side menu for mobile
- Version display component

### Icon System

Uses `unplugin-icons` with auto-install:
```svelte
import IconamoonMenuBurgerHorizontalBold from '~icons/iconamoon/menu-burger-horizontal-bold';
<IconamoonMenuBurgerHorizontalBold class="size-6" />
```

### Build Configuration

- **Adapter**: Vercel adapter with edge runtime (`svelte.config.js`)
- **MDSvex**: Markdown support with `.md` extension
- **Build variables** injected via Vite:
  - `__APP_VERSION__` - from package.json
  - `__BUILD_DATE__` - build timestamp

## Jazz.tools Integration

### Installation

```bash
bun add jazz-tools
# Svelte-specific bindings
bun add jazz-svelte
```

### Integrating Jazz Authentication

Replace the mock auth provider with Jazz's authentication:

1. **Create Jazz auth provider** (`src/lib/auth/providers/jazz.ts`):
   ```typescript
   import { createJazzApp, DemoAuth } from 'jazz-tools';
   import type { AuthProvider, User, LoginCredentials, AuthResponse } from '../types';

   class JazzAuthProvider implements AuthProvider {
     private jazz;
     user = $state<User | null>(null);

     constructor() {
       this.jazz = createJazzApp({
         auth: DemoAuth({
           appName: 'Top Svelte',
         }),
       });

       // Subscribe to Jazz auth state
       this.jazz.me.subscribe((jazzUser) => {
         if (jazzUser) {
           this.user = {
             id: jazzUser.id,
             email: jazzUser.profile?.email || '',
             username: jazzUser.profile?.name,
             // Map other Jazz user properties to our User type
           };
         } else {
           this.user = null;
         }
       });
     }

     async login(credentials: LoginCredentials): Promise<AuthResponse> {
       // Jazz handles auth internally, adapt to our interface
       try {
         await this.jazz.logIn(credentials.email);
         return { success: true, user: this.user };
       } catch (error) {
         return {
           success: false,
           error: error instanceof Error ? error.message : 'Login failed'
         };
       }
     }

     // ... implement other AuthProvider methods
   }

   export const authStore = new JazzAuthProvider();
   ```

2. **Update auth export** (`src/lib/auth/store.svelte.ts`):
   ```typescript
   export { authStore } from './providers/jazz';
   ```

3. **Add environment variables**:
   ```bash
   # .env
   PUBLIC_JAZZ_SERVER=wss://cloud.jazz.tools  # or your Jazz mesh URL
   PUBLIC_JAZZ_APP_NAME=top-svelte
   ```

### Jazz Data Patterns with Svelte 5

Jazz's reactive data structures work seamlessly with Svelte 5 runes:

```typescript
import { Account, CoMap } from 'jazz-tools';
import { useJazz } from 'jazz-svelte';

// Define your data schema
class Profile extends CoMap {
  name = co.string;
  avatar = co.string;
  preferences = co.json<UserPreferences>();
}

// In a Svelte component
let { me } = useJazz<Account>();  // Returns reactive Jazz account

// Access Jazz reactive values - they work like Svelte stores
$: profile = me?.profile;  // Automatically reactive
```

### Jazz + Svelte Store Integration

Jazz uses its own reactivity system. To integrate with existing Svelte stores:

```typescript
import { readable } from 'svelte/store';
import { jazz } from '$lib/jazz';

// Convert Jazz reactive values to Svelte stores
export const profile = readable(null, (set) => {
  const unsubscribe = jazz.me.profile.subscribe(set);
  return unsubscribe;
});
```

### Key Jazz Patterns

1. **Collaborative Data**: Use `CoMap` for objects, `CoList` for arrays, `CoStream` for append-only logs
2. **Permissions**: Jazz has built-in permission system - define who can read/write data
3. **Local-First**: Data is available offline and syncs automatically when online
4. **No API Routes Needed**: Jazz handles client-server sync, eliminating need for REST/GraphQL APIs

### Jazz Considerations for Edge Runtime

Since this project uses Vercel edge runtime:
- Jazz client runs entirely in the browser (no Node.js required)
- Jazz mesh server handles sync (can be self-hosted or use Jazz Cloud)
- No server-side rendering concerns for Jazz data (client-side only)

## File Organization

```
src/
├── lib/
│   ├── auth/                    # Authentication module
│   │   ├── types.ts            # Auth interfaces (IMPORTANT: defines contract)
│   │   ├── store.svelte.ts     # Current implementation (mock)
│   │   ├── providers/          # Auth provider implementations (create for Jazz)
│   │   └── index.ts            # Public exports
│   ├── components/ui/
│   │   ├── Login/              # Auth UI components
│   │   ├── ThemeChange/        # Theme switcher
│   │   └── ...                 # Other UI components
│   ├── stores/                 # Traditional Svelte stores
│   ├── paraglide/              # Auto-generated i18n (don't edit)
│   ├── i18n/                   # i18n messages wrapper
│   └── utils/                  # Utility functions
└── routes/                     # SvelteKit routes
    ├── +layout.svelte          # Root layout
    ├── +page.svelte            # Home page
    ├── profile/                # Profile page
    └── register/               # Registration page
```

## Important Notes

1. **Browser Checks**: Always check `browser` from `$app/environment` before accessing localStorage or browser APIs:
   ```typescript
   import { browser } from '$app/environment';

   if (browser) {
     localStorage.setItem('key', 'value');
   }
   ```

2. **No Test Infrastructure**: Project currently has no test setup. If adding tests, add to package.json scripts.

3. **Docker Development**: The docker-compose.yml is configured for frontend development. Add backend services as needed.

4. **Locale Reactivity**: When using i18n messages, ensure reactivity by subscribing to locale store:
   ```svelte
   import { locale } from '$lib/stores/locale.store';
   $: currentLocale = $locale;

   {#key $locale}
     <!-- Content will re-render on locale change -->
   {/key}
   ```

5. **Environment Variables**: Use `.env.example` as template. Jazz requires:
   - `PUBLIC_JAZZ_SERVER` - Jazz mesh URL (default: wss://cloud.jazz.tools)
   - `PUBLIC_JAZZ_APP_NAME` - Your app identifier

6. **Build Target**: Vercel edge runtime - be mindful of edge runtime limitations (no Node.js APIs). Jazz is fully compatible with edge runtime.

7. **Jazz Reactivity**: Jazz uses its own reactive system. In Svelte components:
   - Jazz values auto-update like Svelte stores (use `$:` for reactivity)
   - No need to manually subscribe/unsubscribe in most cases
   - Jazz data is client-side only - no SSR concerns

8. **Jazz Data Schemas**: Define data schemas as classes extending CoMap/CoList:
   ```typescript
   import { CoMap, co } from 'jazz-tools';

   class UserProfile extends CoMap {
     name = co.string;
     email = co.string;
     avatar = co.string;
   }
   ```

9. **Jazz vs Traditional Stores**: Jazz replaces the need for:
   - API route handlers (+server.ts files)
   - Client-side fetch/axios calls
   - State management for server data (Jazz is the state)
   - Manual real-time sync setup
- when interacting with jazz.tools, read the '/Users/ctw/Sites/github/top-frameworks/top-svelte-jazztools/llms-full.txt' file to understand how exactly works