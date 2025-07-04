# CreatePetForm.jsx

[⬅ Back to Components Index](./Components.md)

### **CreatePetForm**

- **Purpose:** Modal form for creating a new pet.
- **Inputs:**
  - `onClose` (function): Closes the modal
- **Outputs:**
  - Handles form state and submission
  - Calls API to create pet, refreshes pets, closes modal on success
- **Usage:** Rendered by `ProfilePage.jsx` when user clicks add-pet card or button.
- **Children:** `AvatarSelector`, `ModalOverlay`

---

### **AvatarSelector**

- **Purpose:** UI for choosing a pet avatar.
- **Inputs:**
  - `avatar` (string): Currently selected avatar
  - `setAvatar` (function): Updates avatar
  - `disabled` (boolean): Disable selector
- **Outputs:**
  - Renders avatar selection popup
  - Calls `setAvatar` when user picks an avatar
- **Usage:** Used inside `CreatePetForm`.

---

### **ModalOverlay**

- **Purpose:** Handles modal background and close logic for modals.
- **Inputs:**
  - `onClose` (function): Closes the modal
  - `children`: Modal content
- **Outputs:**
  - Renders modal overlay and content
  - Calls `onClose` when background is clicked
- **Usage:** Used by `CreatePetForm` and any other modal.

---
