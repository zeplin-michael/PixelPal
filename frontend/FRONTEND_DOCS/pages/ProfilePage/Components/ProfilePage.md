# ProfilePage.jsx

[⬅ Back to Components Index](./Components.md)

### **ProfilePage.jsx**

- **Purpose:** Main page component, orchestrates all profile features.
- **Children:** `PetGrid.jsx`, `NoPetsMessage.jsx`, `CreatePetForm.jsx`
- **Inputs:** None (uses context/hooks internally)
- **Outputs:** Renders the profile UI, manages state for modals and toggles.
- **Usage:** Top-level page, parent to all profile-related components.

---

### **ProfileHeader (div container)**

- **Purpose:** Header bar for the profile page, shows title and toggle button.
- **Children:** `ToggleDeadButton.jsx`
- **Inputs:** `showDead` (boolean), `setShowDead` (function)
- **Outputs:** Renders header and passes toggle state to `ToggleDeadButton.jsx`.
- **Usage:** Used at the top of `ProfilePage.jsx`.

---

### **NoPetsMessage.jsx**

- **Purpose:** Shows a message (and optionally an add-pet button) when there are no pets in the current grid.
- **Inputs:**
  - `message` (string): Message to display
  - `showAddButton` (boolean): Show add-pet button
  - `onAddPet` (function): Open create pet modal
- **Outputs:**
  - Renders message and add-pet button if applicable
- **Usage:** Used in `ProfilePage.jsx` when alive or dead pet grid is empty.

---

[ Go to ToggleDeadButton ](./ToggleDeadButton.md)
