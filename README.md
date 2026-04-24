# Work Folio

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

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
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/work-folio`](https://www.diegolibonati.com.ar/#/project/work-folio)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

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
