[ ⬅ Back to Custom Hooks](./Hooks.md)

# useMutation

## Table of Contents

- [Overview](#overview)
- [API Reference](#api-reference)
  - [Parameters](#parameters)
  - [Return Value](#return-value)
- [Usage](#usage)
  - [1. Importing and Using the Hook](#1-importing-and-using-the-hook)
  - [2. Example: Creating or Updating a Resource](#2-example-creating-or-updating-a-resource)
- [Implementation Details](#implementation-details)
- [Best Practices](#best-practices)

---

## Overview

`useMutation` is a custom React hook for performing mutations (create, update, delete) on API resources. It provides a function to trigger the mutation, as well as state for the response, loading, and error. It also supports cache/tag invalidation for keeping client data in sync after a mutation.

---

## API Reference

### Parameters

- **method**: `string`  
  The HTTP method to use for the mutation (e.g., `"POST"`, `"PUT"`, `"PATCH"`, `"DELETE"`).

- **resource**: `string`  
  The API endpoint or resource path (e.g., `"/pets"`, `"/users/123"`).

- **tagsToInvalidate**: `array` (optional)  
  An array of cache tags to invalidate after a successful mutation. Used for cache management in the app.

---

### Return Value

The hook returns an object:

| Name      | Type       | Description                                                          |
| --------- | ---------- | -------------------------------------------------------------------- |
| `mutate`  | `function` | Call this function to perform the mutation. Takes a `body` argument. |
| `data`    | `any`      | The response data from the mutation, if any.                         |
| `loading` | `boolean`  | `true` if the mutation request is in progress.                       |
| `error`   | `string?`  | Error message if the mutation failed, or `null` if no error.         |

#### `mutate(body: object): Promise<boolean>`

- **body**: `object`  
  The request body to send with the mutation (will be JSON-stringified).

- **Returns**: `Promise<boolean>`  
  Resolves to `true` on success, `false` on failure.

---

## Usage

### 1. Importing and Using the Hook

```jsx
import useMutation from "../api/useMutation";

function CreatePetForm() {
  const { mutate, data, loading, error } = useMutation("POST", "/pets", [
    "pets",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await mutate({ name: "Fluffy", type: "cat" });
    if (success) {
      // Optionally show a success message or redirect
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        Create Pet
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}
```

---

### 2. Example: Creating or Updating a Resource

```jsx
const { mutate, loading, error, data } = useMutation("PUT", `/pets/${petId}`, [
  "pets",
]);

const handleUpdate = async () => {
  const success = await mutate({ name: "New Name" });
  if (success) {
    // Optionally refresh UI or show a message
  }
};
```

---

## Implementation Details

- Uses the `request` and `invalidateTags` functions from `ApiContext`.
- Sends the request to the specified resource with the given HTTP method and JSON body.
- On success, invalidates the specified tags to refresh any cached data.
- Manages `loading`, `error`, and `data` state internally.
- Returns `true` on success, `false` on failure.

---

## Best Practices

- Always check and handle the `loading` and `error` states in your UI.
- Use `tagsToInvalidate` to keep related data in sync after a mutation (e.g., invalidate `"pets"` after creating/updating a pet).
- Use descriptive resource paths and HTTP methods that match your backend API.
- Use the returned `data` for any response payloads (e.g., new resource IDs).

---

_Last updated: 2025-07-03_
