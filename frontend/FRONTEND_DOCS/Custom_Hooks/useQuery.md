[ ⬅ Back to Custom Hooks](./Hooks.md)

# useQuery

## Table of Contents

- [Overview](#overview)
- [API Reference](#api-reference)
  - [Parameters](#parameters)
  - [Return Value](#return-value)
- [Usage](#usage)
  - [1. Importing and Using the Hook](#1-importing-and-using-the-hook)
  - [2. Example: Fetching Data from an API Resource](#2-example-fetching-data-from-an-api-resource)
- [Implementation Details](#implementation-details)
- [Best Practices](#best-practices)

---

## Overview

`useQuery` is a custom React hook for fetching data from an API resource. It manages the request, loading, and error state, and integrates with a tag-based cache system for automatic updates when related data changes. This hook is ideal for reading data (GET requests) and keeping UI in sync with backend changes.

---

## API Reference

### Parameters

- **resource**: `string`  
  The API endpoint or resource path to fetch (e.g., `"/pets"`, `"/users/123"`).

- **tag**: `string`  
  A cache tag used for automatic re-fetching when related data is invalidated (e.g., `"pets"`).

---

### Return Value

The hook returns an object:

| Name      | Type      | Description                                                 |
| --------- | --------- | ----------------------------------------------------------- |
| `data`    | `any`     | The response data from the API, if any.                     |
| `loading` | `boolean` | `true` if the request is in progress.                       |
| `error`   | `string?` | Error message if the request failed, or `null` if no error. |

---

## Usage

### 1. Importing and Using the Hook

```jsx
import useQuery from "../api/useQuery";

function PetList() {
  const { data: pets, loading, error } = useQuery("/pets", "pets");

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

### 2. Example: Fetching Data from an API Resource

```jsx
const { data: user, loading, error } = useQuery(`/users/${userId}`, "users");

if (loading) return <Spinner />;
if (error) return <ErrorMessage message={error} />;
if (!user) return null;

return <div>{user.username}</div>;
```

---

## Implementation Details

- Uses the `request` and `provideTag` functions from `ApiContext`.
- Fetches data from the specified resource when the component mounts.
- Registers the query with a cache tag for automatic re-fetching when the tag is invalidated (e.g., after a mutation).
- Manages `loading`, `error`, and `data` state internally.

---

## Best Practices

- Always check and handle the `loading` and `error` states in your UI.
- Use descriptive resource paths and tags that match your backend and cache structure.
- Use the same tag for related queries and mutations to keep data in sync.
- Use the returned `data` for rendering or further processing.

---

_Last updated: 2025-07-03_
