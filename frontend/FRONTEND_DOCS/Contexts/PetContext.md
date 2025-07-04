[ ⬅ Back to Contexts](./Contexts.md)

# PetContext.jsx

## Table of Contents

- [Overview](#overview)
- [API Reference](#api-reference)
  - [Context Value](#context-value)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
- [Usage](#usage)
  - [1. Wrapping your app](#1-wrapping-your-app)
  - [2. Accessing Pet State and Actions](#2-accessing-pet-state-and-actions)
  - [3. Handling Loading and Error States](#3-handling-loading-and-error-states)
  - [4. Manually Refreshing Pets](#4-manually-refreshing-pets)
- [Implementation Details](#implementation-details)
- [Best Practices](#best-practices)
- [Example: Displaying a Pet Grid](#example-displaying-a-pet-grid)

## Overview

`PetContext` provides global state and actions for managing the user's pets. It fetches the pet list from the backend, keeps it up-to-date with polling, and exposes the pets array, loading and error states, and a manual refresh function. This enables any component in the app to access and update pet data without prop drilling.

---

## API Reference

### Context Value

The context provides the following values and functions:

| Name          | Type       | Description                                                               |
| ------------- | ---------- | ------------------------------------------------------------------------- |
| `pets`        | `array?`   | Array of pet objects, or `null` if not loaded or on error.                |
| `setPets`     | `function` | Function to manually set the pets array (advanced usage).                 |
| `loading`     | `boolean`  | `true` if pets are being loaded or refreshed.                             |
| `error`       | `string?`  | Error message if fetching pets failed, or `null` if no error.             |
| `refreshPets` | `function` | Function to manually trigger a fetch of the latest pets from the backend. |

---

### Inputs

- **No direct input required.**  
  The context automatically fetches pets for the authenticated user (requires a valid `token` from `AuthContext`).

- **For advanced usage:**
  - `setPets(newPetsArray)` can be used to update the pets array locally.

---

### Outputs

- **pets**: `array` or `null`  
  The current list of pet objects for the user.
- **setPets(newPetsArray)**: `void`  
  Updates the pets array in context (useful after local changes).
- **loading**: `boolean`  
  Indicates if pets are being loaded or refreshed.
- **error**: `string` or `null`  
  Error message if fetching pets failed.
- **refreshPets()**: `Promise<void>`  
  Manually triggers a fetch of the latest pets from the backend.

---

## Usage

### 1. Wrapping your app

Wrap your app in the `PetProvider` so all children can access the context:

```jsx
import { PetProvider } from "../api/PetContext";

function App() {
  return <PetProvider>{/* ...rest of your app */}</PetProvider>;
}
```

---

### 2. Accessing Pet State and Actions

Use the `usePet` hook in any child component to access the context:

```jsx
import { usePet } from "../api/PetContext";

function PetList() {
  const { pets, loading, error } = usePet();

  if (loading) return <div>Loading pets...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pets || pets.length === 0) return <div>No pets found.</div>;

  return (
    <ul>
      {pets.map((pet) => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </ul>
  );
}
```

---

### 3. Handling Loading and Error States

Always check `loading` and `error` before rendering pet data:

```jsx
const { pets, loading, error } = usePet();

if (loading) return <Spinner />;
if (error) return <ErrorMessage message={error} />;
```

---

### 4. Manually Refreshing Pets

You can manually trigger a refresh of the pets array (e.g., after creating or updating a pet):

```jsx
const { refreshPets } = usePet();

const handlePetCreated = async () => {
  await refreshPets();
  // Optionally show a success message or update UI
};
```

---

## Implementation Details

- Pets are fetched from the backend `/pets` endpoint using the user's auth token.
- The context automatically polls for updates every 5 seconds to keep the pet list fresh.
- The pets array, loading, and error states are managed in React state.
- The `refreshPets` function can be called to manually fetch the latest pets (e.g., after a mutation).
- If the user logs out or the token changes, the context will stop fetching pets.

---

## Best Practices

- Always wrap your app in `PetProvider` at the top level (inside `AuthProvider`).
- Use the `usePet` hook only inside components that are descendants of `PetProvider`.
- Always check `loading` and `error` before rendering pet data.
- Use `refreshPets` after any action that changes the pet list (e.g., add, delete, update).
- Use `setPets` only for advanced scenarios (e.g., optimistic UI updates).

---

## Example: Displaying a Pet Grid

```jsx
import { usePet } from "../api/PetContext";

function PetGrid() {
  const { pets, loading, error, refreshPets } = usePet();

  if (loading) return <div>Loading pets...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pets || pets.length === 0) return <div>No pets found.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {pets.map((pet) => (
        <div key={pet.id} className="p-4 border rounded">
          <h3>{pet.name}</h3>
          <p>Level: {pet.level}</p>
          {/* ...other pet info... */}
        </div>
      ))}
      <button onClick={refreshPets} className="col-span-full mt-4">
        Refresh Pets
      </button>
    </div>
  );
}
```

---

_Last updated: 2025-07-03_
