# PetGrid.jsx

[⬅ Back to Components Index](./Components.md)

### **PetGrid**

- **Purpose:** Renders a grid of pet cards and (optionally) the add-pet card.
- **Inputs:**
  - `pets` (array): Pets to display
  - `showAddButton` (boolean): Show "+" card
  - `onAddPet` (function): Open create pet modal
- **Outputs:**
  - Renders a list of `PetProfile` components (one per pet)
  - Renders add-pet card if `showAddButton` is true
- **Usage:** Used in `ProfilePage.jsx` for both alive and dead pet grids.
- **Children:** `PetProfile`, add-pet card (button)
- **Special:** Handles click on grid background to deselect pet.

---

[ Go to PetProfile ](./PetProfile.md)
