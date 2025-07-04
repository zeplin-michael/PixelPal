[ ⬅ Back to Contexts](./Contexts.md)

# SelectedPetContext.jsx

## Table of Contents

- [Overview](#overview)
- [API Reference](#api-reference)
  - [Context Value](#context-value)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
- [Usage](#usage)
  - [1. Wrapping your app](#1-wrapping-your-app)
  - [2. Accessing and Setting the Selected Pet](#2-accessing-and-setting-the-selected-pet)
  - [3. Deselecting a Pet](#3-deselecting-a-pet)
- [Implementation Details](#implementation-details)
- [Best Practices](#best-practices)
- [Example: Selecting and Deselecting a Pet Card](#example-selecting-and-deselecting-a-pet-card)

## Overview

`SelectedPetContext` provides a simple, global way to track which pet is currently selected in the UI. It exposes the currently selected pet object and a setter function, allowing any component to read or update the selected pet without prop drilling. This is commonly used for highlighting, showing details, or performing actions on a specific pet.

---

## API Reference

### Context Value

The context provides the following values and functions:

| Name             | Type       | Description                                     |
| ---------------- | ---------- | ----------------------------------------------- |
| `selectedPet`    | `object?`  | The currently selected pet object, or `null`.   |
| `setSelectedPet` | `function` | Function to set the selected pet (or deselect). |

---

### Inputs

- **setSelectedPet(petObjectOrNull)**
  - `petObjectOrNull`: The pet object to select, or `null` to deselect.

---

### Outputs

- **selectedPet**: `object` or `null`  
  The currently selected pet object, or `null` if none is selected.
- **setSelectedPet(petObjectOrNull)**: `void`  
  Sets the selected pet, or clears the selection if passed `null`.

---

## Usage

### 1. Wrapping your app

Wrap your app in the `SelectedPetProvider` so all children can access the context:

```jsx
import { SelectedPetProvider } from "../api/SelectedPetContext";

function App() {
  return <SelectedPetProvider>{/* ...rest of your app */}</SelectedPetProvider>;
}
```

---

### 2. Accessing and Setting the Selected Pet

Use the `useSelectedPet` hook in any child component to access or update the selected pet:

```jsx
import { useSelectedPet } from "../api/SelectedPetContext";

function PetCard({ pet }) {
  const { selectedPet, setSelectedPet } = useSelectedPet();

  const isSelected = selectedPet && selectedPet.id === pet.id;

  return (
    <div
      className={isSelected ? "border-blue-500" : "border-gray-300"}
      onClick={() => setSelectedPet(pet)}
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select pet ${pet.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setSelectedPet(pet);
      }}
    >
      {pet.name}
    </div>
  );
}
```

---

### 3. Deselecting a Pet

To clear the selection (e.g., when clicking outside a card or closing a modal):

```jsx
const { setSelectedPet } = useSelectedPet();

const handleDeselect = () => setSelectedPet(null);
```

---

## Implementation Details

- The selected pet is stored in React state and provided via context.
- Any component can read or update the selected pet.
- Setting `selectedPet` to `null` will deselect any currently selected pet.
- The context does not persist selection across page reloads.

---

## Best Practices

- Always wrap your app in `SelectedPetProvider` at the top level (inside `PetProvider` if both are used).
- Use the `useSelectedPet` hook only inside components that are descendants of `SelectedPetProvider`.
- Use `setSelectedPet(null)` to clear the selection when appropriate (e.g., on modal close or background click).
- Use the `selectedPet` value to determine which pet is currently active or highlighted in the UI.

---

## Example: Selecting and Deselecting a Pet Card

```jsx
import { useSelectedPet } from "../api/SelectedPetContext";

function PetGrid({ pets }) {
  const { selectedPet, setSelectedPet } = useSelectedPet();

  // Deselect when clicking outside any card
  const handleGridClick = (e) => {
    if (e.target === e.currentTarget) setSelectedPet(null);
  };

  return (
    <div className="grid gap-4" onClick={handleGridClick}>
      {pets.map((pet) => (
        <div
          key={pet.id}
          className={
            "p-4 border rounded " +
            (selectedPet && selectedPet.id === pet.id
              ? "border-blue-500"
              : "border-gray-300")
          }
          onClick={() => setSelectedPet(pet)}
          tabIndex={0}
          aria-pressed={selectedPet && selectedPet.id === pet.id}
          aria-label={`Select pet ${pet.name}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setSelectedPet(pet);
          }}
        >
          {pet.name}
        </div>
      ))}
    </div>
  );
}
```

---

_Last updated: 2025-07-03_
