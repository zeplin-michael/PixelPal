[ ⬅ Back to Contexts](./Contexts.md)

# AuthContext.jsx

## Table of Contents

- [Overview](#overview)
- [API Reference](#api-reference)
  - [Context Value](#context-value)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
- [Usage](#usage)
  - [1. Wrapping your app](#1-wrapping-your-app)
  - [2. Accessing Auth State and Actions](#2-accessing-auth-state-and-actions)
  - [3. Checking if User is Logged In](#3-checking-if-user-is-logged-in)
  - [4. Logging Out](#4-logging-out)
- [Implementation Details](#implementation-details)
- [Best Practices](#best-practices)
- [Example: Protecting a Route](#example-protecting-a-route)

## Overview

`AuthContext` provides authentication state and actions to the React app. It manages the user's authentication token, handles login, registration, and logout, and exposes these via a React context. This allows any component in the app to access authentication status and perform auth actions without prop drilling.

---

## API Reference

### Context Value

The context provides the following values and functions:

| Name       | Type       | Description                                                          |
| ---------- | ---------- | -------------------------------------------------------------------- |
| `token`    | `string?`  | The current user's authentication token, or `null` if not logged in. |
| `register` | `function` | Registers a new user. Takes credentials object, returns a Promise.   |
| `login`    | `function` | Logs in a user. Takes credentials object, returns a Promise.         |
| `logout`   | `function` | Logs out the user, clears the token.                                 |

---

### Inputs

- **Credentials object** for `register` and `login`:
  ```js
  {
    username: string,
    password: string
  }
  ```

---

### Outputs

- **token**: `string` or `null`
  - The JWT or session token for the authenticated user.
- **register(credentials)**: `Promise<void>`
  - Resolves on success, rejects with error message on failure.
- **login(credentials)**: `Promise<void>`
  - Resolves on success, rejects with error message on failure.
- **logout()**: `void`
  - Clears the token and logs out the user.

---

## Usage

### 1. Wrapping your app

Wrap your app in the `AuthProvider` so all children can access the context:

```jsx
import { AuthProvider } from "../auth/AuthContext";

function App() {
  return <AuthProvider>{/* ...rest of your app */}</AuthProvider>;
}
```

---

### 2. Accessing Auth State and Actions

Use the `useAuth` hook in any child component to access the context:

```jsx
import { useAuth } from "../auth/AuthContext";

function LoginForm() {
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      // Redirect or show success
    } catch (err) {
      // Show error message
    }
  };

  // ...render form
}
```

---

### 3. Checking if User is Logged In

```jsx
const { token } = useAuth();

if (token) {
  // User is logged in
} else {
  // User is not logged in
}
```

---

### 4. Logging Out

```jsx
const { logout } = useAuth();

<button onClick={logout}>Log Out</button>;
```

---

## Implementation Details

- The token is stored in `sessionStorage` and kept in sync with React state.
- On login/register, the token is set and persisted.
- On logout, the token is cleared from both state and storage.
- If the page is refreshed, the token is reloaded from `sessionStorage`.

---

## Best Practices

- Always wrap your app in `AuthProvider` at the top level.
- Use the `useAuth` hook only inside components that are descendants of `AuthProvider`.
- Handle errors from `login` and `register` (e.g., show error messages to users).
- Use the `token` to determine if the user is authenticated and to authorize API requests.

---

## Example: Protecting a Route

```jsx
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return children;
}
```

---

_Last updated: 2025-07-03_
