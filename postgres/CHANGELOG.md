# 1.0.0 (2025-09-21)


### Features

* add Eruda for mobile debugging in development ([98c54c3](https://github.com/ctwhome/top-sveltekit/commit/98c54c3ac8d64d84d437c46e9296e3d8c284df85))
* enhance feedback modal with browser and platform information ([c080f7f](https://github.com/ctwhome/top-sveltekit/commit/c080f7fcbb9d2beb9fe888ef01b4380ace375b4e))
* implement floating label styles for login and registration forms ([f782f67](https://github.com/ctwhome/top-sveltekit/commit/f782f6747afdf2bfdd3845989c1be137aa1209a9))
* implement ThemeChange component with theme switching functionality ([23e1e59](https://github.com/ctwhome/top-sveltekit/commit/23e1e596b3762816adce9ed6dd50baf86b21ac16))
* initialize Svelte project with TypeScript, ESLint, and Prettier ([c78dccc](https://github.com/ctwhome/top-sveltekit/commit/c78dcccbe7d0e6944f5fe78cbb9ab8cb81679baf))
* integrate semantic release for automated versioning and changelog generation ([9cc586d](https://github.com/ctwhome/top-sveltekit/commit/9cc586dad1ab7381ea8a101cdbf6ceab504d55df))
* update mdsvex configuration and add type definitions ([1fb91f2](https://github.com/ctwhome/top-sveltekit/commit/1fb91f2e46b25c182f82636fdc5ed4c6bcf62835))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-21

### Initial Release

#### Features
- **Authentication System**: Complete auth implementation with AuthJS
  - Email/password authentication
  - OAuth providers support
  - Role-based access control (RBAC)
  - Protected routes and middleware

- **Database Integration**: PostgreSQL with migrations
  - Database migrations with node-pg-migrate
  - Seed data for development
  - Docker compose setup for local development

- **UI/UX Foundation**: Modern, responsive design
  - SvelteKit with Svelte 5
  - TailwindCSS v4 with custom theme
  - DaisyUI component library
  - Dark mode support with theme switching
  - Floating label forms for login/registration

- **Developer Experience**
  - TypeScript for type safety
  - ESLint and Prettier configuration
  - Hot module replacement
  - Comprehensive documentation

#### Infrastructure
- Docker support for containerized development
- Environment-based configuration
- Vercel deployment ready
- GitHub Actions CI/CD pipeline ready

### Technologies
- **Frontend**: SvelteKit 2.16, Svelte 5.19, TypeScript 5.7
- **Styling**: TailwindCSS 4.1, DaisyUI 5.0
- **Backend**: Node.js, AuthJS 1.7
- **Database**: PostgreSQL with pg-adapter
- **Build**: Vite 6.0, Bun package manager
- **Quality**: ESLint, Prettier, Svelte-check

---

For upcoming releases, this changelog will be automatically updated based on conventional commits.
