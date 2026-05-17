# Work Folio

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Work Folio** is a single-page React application that displays a professional work experience timeline through an interactive tabbed interface. Each tab represents a different company the user has worked at, and clicking a tab reveals a detailed panel with the job title, employment dates, and a list of responsibilities and achievements for that role.

The application fetches job data from an external API on load, shows a loading spinner while the request is in flight, and then renders the full experience list once the data is ready. The first company is selected by default, so users immediately see content without any extra interaction.

Navigation is fully accessible: tabs follow the WAI-ARIA `tablist`/`tab`/`tabpanel` pattern, meaning keyboard users can move between companies using the Tab key without needing a mouse. Every interactive element has a descriptive `aria-label` so screen readers can announce the context clearly.

The project is built with React 19 and TypeScript in strict mode, bundled with Vite, and covered by a Jest + React Testing Library test suite that verifies rendering, user interactions, API integration, and accessibility attributes.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

The stack above is wired together through the following packages, split into runtime and development dependencies.

#### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"msw": "2.10.4"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"undici": "^7.25.0"
"vite": "^7.1.6"
```

## Getting Started

With the stack in mind, follow these steps to run the project locally:

1. Clone the repository
2. Navigate to the project folder
3. Copy `.env.example` to `.env` and adjust the `VITE_API_URL` value if needed (it sets the proxy target for `/react-tabs-project` requests)
4. Execute: `npm install`
5. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app runs locally, you can verify it with the Jest + React Testing Library suite, which exercises rendering, user interactions, API integration, and accessibility attributes.

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

### Pipeline overview

```
                    ┌─── PR or push to main ───┐
                    ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────────┐
│    lint-and-audit    │─▶│      testing      │─▶│        build         │
│ eslint · type-check  │  │       jest        │  │  tsc + vite build    │
└──────────────────────┘  └──────────────────┘  └──────────────────────┘
```

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — runs `npm run lint` (ESLint on `src/`) and `npm run type-check` (`tsc -p tsconfig.app.json --noEmit`).
2. **`testing`** — runs `npm run test` (Jest + React Testing Library, with MSW intercepting HTTP at the network layer).
3. **`build`** — runs `npm run build` (TypeScript compile + Vite production bundle) as a smoke test that the app builds successfully.

Every job checks out the repo, sets up Node using the version pinned in [`.nvmrc`](.nvmrc), restores the npm cache, and installs dependencies with `npm ci`. `testing` is gated on `lint-and-audit` and `build` is gated on `testing`, so the pipeline fails fast.

### Where the build outputs live

| Output                      | Location                                                      |
| --------------------------- | ------------------------------------------------------------- |
| Lint, type-check, test logs | **Actions** tab on GitHub                                     |
| Production bundle (`dist/`) | Ephemeral, inside the runner                                  |
| Coverage report             | Generated locally via `npm run test:coverage` (not published) |

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

## Security Audit

Beyond functional testing, the project ships with tooling to inspect dependencies and overall project health.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/work-folio`](https://www.diegolibonati.com.ar/#/project/work-folio)
