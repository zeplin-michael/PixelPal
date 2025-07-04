[ ⬅ Back to Custom Hooks](./Hooks.md)

# useIncrementOverallStat

## Table of Contents

- [Overview](#overview)
- [API Reference](#api-reference)
  - [Parameters](#parameters)
  - [Return Value](#return-value)
- [Usage](#usage)
  - [1. Importing and Using the Hook](#1-importing-and-using-the-hook)
  - [2. Example: Incrementing a Pet Stat](#2-example-incrementing-a-pet-stat)
- [Implementation Details](#implementation-details)
- [Best Practices](#best-practices)

---

## Overview

`useIncrementOverallStat` is a custom React hook for incrementing a specific overall stat for a pet. It handles the API call, loading, and error state for you. This hook is typically used in pet action components (e.g., when a user feeds, plays with, or cares for their pet) to update the pet's stats on the backend.

---

## API Reference

### Parameters

- **petId**: `string` or `number`  
  The unique identifier of the pet whose stat you want to increment.

### Return Value

The hook returns a tuple:

| Index | Name          | Type       | Description                                                     |
| ----- | ------------- | ---------- | --------------------------------------------------------------- |
| 0     | incrementStat | `function` | Call this function to increment a stat. Takes `statColumn` arg. |
| 1     | loading       | `boolean`  | `true` if the request is in progress.                           |
| 2     | error         | `string?`  | Error message if the request failed, or `null` if no error.     |

#### `incrementStat(statColumn: string): Promise<void>`

- **statColumn**: `string`  
  The name of the stat column to increment (e.g., `"happiness"`, `"hunger"`).

---

## Usage

### 1. Importing and Using the Hook

```jsx
import useIncrementOverallStat from "../api/useIncrementOverallStat";

function StatButton({ petId, statColumn }) {
  const [incrementStat, loading, error] = useIncrementOverallStat(petId);

  const handleClick = async () => {
    await incrementStat(statColumn);
    // Optionally refresh pet data or show a message
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      Increment {statColumn}
      {loading && "…"}
      {error && <span className="text-red-500">{error}</span>}
    </button>
  );
}
```

---

### 2. Example: Incrementing a Pet Stat

```jsx
const [incrementStat, loading, error] = useIncrementOverallStat(
  selectedPet?.id
);

const handleFeed = () => incrementStat("hunger");
const handlePlay = () => incrementStat("happiness");

return (
  <div>
    <button onClick={handleFeed} disabled={loading}>
      Feed
    </button>
    <button onClick={handlePlay} disabled={loading}>
      Play
    </button>
    {error && <div className="text-red-500">{error}</div>}
  </div>
);
```

---

## Implementation Details

- Uses the current user's auth token from `AuthContext`.
- Sends a `POST` request to `/pet_overall_stats/:petId/increment` with the stat column in the body.
- Handles loading and error state internally.
- Returns a stable function reference (`incrementStat`) using `useCallback`.

---

## Best Practices

- Always check and handle the `loading` and `error` states in your UI.
- Use the hook only for pets the current user is allowed to modify.
- Call `refreshPets` from `PetContext` after incrementing a stat if you want to update the UI with the latest pet data.
- Use descriptive stat column names that match your backend API.

---

_Last updated: 2025-07-03_
