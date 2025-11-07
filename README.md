# Pixel Textures - Frontend

This is the client-side of the "Pixel Textures" web application, built with React and Vite. The application is a digital texture catalog with filtering, sorting, and administration capabilities.

## Core Technologies

- **Framework**: React
- **Bundler**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS Modules (no CSS frameworks)
- **Animations**: Framer Motion
- **Forms**: React Hook Form

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/IshNekittt/texture-website-frontend.git
cd texture-website-frontend
```

### 2. Install Dependencies

Ensure you have Node.js (version 18 or higher) installed.

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add the variable pointing to your backend server.

```dotenv
VITE_API_URL=http://localhost:3000
```

- For local development, use `http://localhost:3000`.
- For production, specify the URL of your deployed backend service (e.g., `https://some-url.com`).

### 4. Run the Project

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs the ESLint code checker.
- `npm run preview`: Starts a local server to preview the production build.

## Project Structure

- **`public/`**: Static assets (icons, images).
- **`src/`**: The main source code folder.
  - **`api/`**: Axios client configuration for backend communication.
  - **`components/`**: Reusable React components (Header, Loader, TextureCard, etc.).
  - **`contexts/`**: React Context for global state not managed by Redux.
  - **`pages/`**: Page components corresponding to routes (HomePage, CataloguePage, AdminLoginPage, etc.).
  - **`redux/`**: All state management logic using Redux Toolkit.
    - **`admin/`**, **`categories/`**, **`textures/`**, **`theme/`**: State slices, separated by feature.
  - **`utils/`**: Helper functions (formatters, parsers).
  - **`validation/`**: Validation schemas (e.g., for forms).
