# Profile Page Logic & Features

[⬅ Back to Pages Index](../pages.md) | [Component Reference](./Components/Components.md)

## Table of Contents

- [Overview](#overview)
- [Logic Flow & Feature Breakdown](#logic-flow--feature-breakdown)
  - [Authentication & Data Fetching](#1-authentication--data-fetching)
  - [Pet State Splitting](#2-pet-state-splitting)
  - [Toggle Button (ToggleDeadButton)](#3-toggle-button-toggledeadbutton)
  - [Pet Grid Rendering (PetGrid)](#4-pet-grid-rendering-petgrid)
  - [Create Pet Modal (CreatePetForm)](#5-create-pet-modal-createpetform)
  - [Pet Selection](#6-pet-selection)
  - [Component Hierarchy](#7-component-hierarchy)
  - [Alive vs Dead Pet Rendering](#8-alive-vs-dead-pet-rendering)
  - [Accessibility & UX](#9-accessibility--ux)
- [How Features Work Together](#how-features-work-together)
- [Related Components](#related-components)

---

## Overview

The **Profile Page** is the main hub for users to view, manage, and interact with their pets. It provides a responsive grid of pet cards, allows toggling between alive and dead pets, and supports creating new pets via a modal form. The page is highly interactive and leverages global state via React Contexts.

---

## Logic Flow & Feature Breakdown

### 1. **Authentication & Data Fetching**

- The page uses `useAuth()` to check if the user is logged in.
- If not logged in, a message and login link are shown.
- If logged in, `usePet()` fetches the user's pets (polls every 5 seconds for real-time updates).

### 2. **Pet State Splitting**

- The pets array is split into two:
  - **Alive pets:** `pets.filter((pet) => !pet.dead)`
  - **Dead pets:** `pets.filter((pet) => pet.dead)`
- This enables separate rendering and toggling between alive and dead pet grids.

### 3. **Toggle Button (ToggleDeadButton)**

- The `ToggleDeadButton` is rendered in the profile header.
- **Props:**
  - `showDead` (boolean): Whether the dead pets grid is shown.
  - `setShowDead` (function): Toggles the state.
- **Behavior:**
  - Clicking the button toggles between alive and dead pet views.
  - The button icon and tooltip update based on the current state.
- **Component Flow:**
  - The button is always visible in the header.
  - When toggled, the main grid below switches between alive and dead pets.

### 4. **Pet Grid Rendering (PetGrid)**

- **Alive pets grid:**
  - Shows all alive pets as cards.
  - Includes a "+" add-pet card at the end.
- **Dead pets grid:**
  - Shows all dead pets as cards.
  - No add-pet card is shown.
- **No pets:**
  - If there are no pets in the current view, a `NoPetsMessage` is displayed (with or without an add-pet button).

### 5. **Create Pet Modal (CreatePetForm)**

- The "+" card or "Add Pal" button opens the `CreatePetForm` modal.
- **Modal logic:**
  - Controlled by `showCreateModal` state in `ProfilePage.jsx`.
  - Only available when viewing alive pets.
- **Form flow:**
  - User enters a name and selects an avatar (via `AvatarSelector`).
  - On submit, the pet is created via API, pets are refreshed, and the modal closes.

### 6. **Pet Selection**

- Clicking a pet card sets it as the `selectedPet` in global context.
- Clicking outside any card (on the grid background) deselects the pet.
- The selected pet is visually highlighted.

### 7. **Component Hierarchy**

```
ProfilePage.jsx
│
├── ProfileHeader (h2 + ToggleDeadButton)
│
├── PetGrid (renders PetProfile for each pet, and add-pet card if alive grid)
│     └── PetProfile (decides between AlivePetProfile and DeadPetProfile)
│           ├── AlivePetProfile (shows stats, select, play, info modal)
│           └── DeadPetProfile (shows lifetime stats)
│
├── NoPetsMessage (if no pets in current view)
│
└── CreatePetForm (modal, only if showCreateModal && !showDead)
```

### 8. **Alive vs Dead Pet Rendering**

- The main state variable `showDead` determines which grid is rendered.
- All logic for splitting, toggling, and rendering is centralized in `ProfilePage.jsx`.

### 9. **Accessibility & UX**

- All interactive elements have `aria-labels` and keyboard navigation.
- Modals can be closed by clicking outside or pressing the close button.
- Tooltips and focus states are provided for toggle and add-pet buttons.

---

## How Features Work Together

- **Toggling:**  
  The toggle button updates `showDead`, which switches the grid between alive and dead pets.
- **Creating a Pet:**  
  The add-pet card or button opens the modal. On success, the grid updates in real time.
- **Selecting a Pet:**  
  Clicking a card sets the selected pet, which is used for navigation to the game page.
- **Dead Pets:**  
  Dead pets are only shown when toggled. Their cards display lifetime stats and use a "death" avatar.

---

## Related Components

- [PetGrid.jsx](./Components/PetGrid.md)
- [PetProfile.jsx](./Components/PetProfile.md)

- [CreatePetForm.jsx](./Components/CreatePetForm.md)

- [ToggleDeadButton.jsx](./Components/ToggleDeadButton.md)
- [ProfilePage.jsx](./Components/ProfilePage.md)

---

_Last updated: 2025-07-03_
