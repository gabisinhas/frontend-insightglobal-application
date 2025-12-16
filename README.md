# React + TypeScript + Vite Project

This project is a modern web application built using React, TypeScript, and Vite. It provides a fast development environment with hot module replacement (HMR) and a robust setup for scalable and maintainable code.

## Features

- **React + TypeScript**: Strongly typed components for better developer experience.
- **Vite**: Lightning-fast development server and build tool.
- **Component-Based Architecture**: Modular and reusable components.
- **GraphQL Integration**: Query handling with `src/graphql/queries.ts`.
- **Custom Hooks**: Encapsulated logic in `src/hooks/`.
- **Testing**: Comprehensive test coverage with Jest and Cypress.
- **Mock Service Worker (MSW)**: API mocking for development and testing.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 16.x)
- pnpm (preferred package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd workspace
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Development Server

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

Build the application:
```bash
pnpm build
```

The production-ready files will be in the `dist/` directory.

### Running Tests

- **Jest Tests**:
  ```bash
  pnpm test
  ```
- **Cypress Tests**:
  ```bash
  pnpm cypress:open
  ```

## Project Structure

```plaintext
src/
├── components/         # Reusable UI components
│   ├── AddCarForm/     # Add car form component
│   ├── CarList/        # Car list component
│   ├── Footer/         # Footer component
│   └── Header/         # Header component
├── constants/          # Application constants
├── graphql/            # GraphQL queries
├── hooks/              # Custom React hooks
├── mocks/              # Mock service worker handlers
├── tests/              # Unit and integration tests
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
