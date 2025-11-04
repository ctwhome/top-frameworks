# Top Frameworks Monorepo

A collection of framework templates and starter projects, consolidated into a single monorepo while preserving complete git history of each project.

## 📦 Projects

### Nuxt & Vue

- **[nuxt-apollo-hasura](./nuxt-apollo-hasura/)** - Nuxt application with Apollo Client and Hasura GraphQL integration
- **[top-nuxt3](./top-nuxt3/)** ⭐ (100+ stars) - Modern Nuxt 3 template with best practices
- **[top-next](./top-next/)** - Next.js starter template

### SvelteKit

- **[top-svelte-electric](./top-svelte-electric/)** - SvelteKit with ElectricSQL (local-first)
- **[top-svelte-jazz](./top-svelte-jazz/)** - SvelteKit with Jazz (collaborative sync)
- **[top-svelte-pocketbase](./top-svelte-pocketbase/)** - SvelteKit with PocketBase backend
- **[top-svelte-postgres](./top-svelte-postgres/)** - SvelteKit with PostgreSQL integration
- **[top-svelte-postgres-rls](./top-svelte-postgres-rls/)** - SvelteKit with PostgreSQL Row-Level Security
- **[top-svelte-tinybase](./top-svelte-tinybase/)** - SvelteKit with TinyBase (reactive data store)
- **[top-svelte-trailbase](./top-svelte-trailbase/)** - SvelteKit with Trailbase backend
- **[top-tauri-sveltekit](./top-tauri-sveltekit/)** - Desktop app with Tauri + SvelteKit

### Other

- **[top-wordpress](./top-wordpress/)** - WordPress development setup with Docker

## 🎯 Purpose

This monorepo serves as:
- A central location for maintaining multiple framework templates
- Preserved history for all 12 projects (250+ total commits)
- Easy comparison between different tech stacks and backends
- Template repository for new projects

## 📊 Repository Stats

- **Total Projects**: 12
- **Total Commits**: 250+
- **Frameworks**: Nuxt 3, Next.js, SvelteKit, Tauri, WordPress
- **Backends**: PocketBase, PostgreSQL (with RLS), Trailbase, Hasura, ElectricSQL, Jazz, TinyBase

## 🚀 Usage

Each project maintains its own README with specific setup instructions. Navigate to the individual project directories for details:

```bash
cd top-nuxt3/                  # For Nuxt 3 template
cd top-svelte-pocketbase/      # For SvelteKit + PocketBase
cd top-svelte-postgres-rls/    # For SvelteKit + PostgreSQL with RLS
# etc...
```

## 📜 History

This monorepo was created by merging the following independent repositories:
- [ctwhome/top-nuxt3](https://github.com/ctwhome/top-nuxt3) (archived) - ⭐ 115 stars
- [ctwhome/top-sveltekit](https://github.com/ctwhome/top-sveltekit) (archived) - Previously a monorepo containing:
  - top-svelte-electric, top-svelte-jazz, top-svelte-postgres-rls, top-svelte-tinybase
- [ctwhome/top-svelte-pocketbase](https://github.com/ctwhome/top-svelte-pocketbase) (archived)
- [ctwhome/top-svelte-postgres](https://github.com/ctwhome/top-svelte-postgres) (archived)
- [ctwhome/top-svelte-trailbase](https://github.com/ctwhome/top-svelte-trailbase) (archived)
- [ctwhome/top-tauri-sveltekit](https://github.com/ctwhome/top-tauri-sveltekit) (archived)
- [ctwhome/top-next](https://github.com/ctwhome/top-next) (archived)
- [NLeSC/nuxt-apollo-hasura](https://github.com/NLeSC/nuxt-apollo-hasura)

All commit history has been preserved during the migration. The repository structure was flattened to have all projects at the root level for easier navigation and maintenance.

## 🤝 Contributing

Each project can be developed independently. Feel free to:
- Open issues for specific projects
- Submit PRs targeting individual project directories
- Suggest improvements to the monorepo structure

## 📝 License

Each project may have its own license. Check individual project directories for details.
