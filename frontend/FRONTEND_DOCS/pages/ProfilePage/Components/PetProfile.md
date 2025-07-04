# PetProfile.jsx

[⬅ Back to Components Index](./Components.md)

### **PetProfile**

- **Purpose:** Decides whether to render `AlivePetProfile` or `DeadPetProfile` for a given pet.
- **Inputs:**
  - `pet` (object): The pet to display
- **Outputs:**
  - Renders either `AlivePetProfile` or `DeadPetProfile`
  - Manages state for showing `StatsInfoModal` (for alive pets)
- **Usage:** Used by `PetGrid` for each pet.

---

### **AlivePetProfile**

- **Purpose:** Shows info and actions for a live pet.
- **Inputs:**
  - `pet` (object): The pet to display
  - `onShowStats` (function): Opens the stats info modal
- **Outputs:**
  - Renders pet stats, avatar, and a "Play" link
  - Calls `setSelectedPet` on click to select this pet
  - Renders a "?" button to open `StatsInfoModal`
- **Usage:** Rendered by `PetProfile` if the pet is alive.
- **Children:** `StatsInfoModal` (conditionally, as modal)

---

### **DeadPetProfile**

- **Purpose:** Shows info and lifetime stats for a dead pet.
- **Inputs:**
  - `pet` (object): The pet to display
- **Outputs:**
  - Fetches and displays overall stats for the pet
  - Renders death avatar and stats list
- **Usage:** Rendered by `PetProfile` if the pet is dead.

---

### **StatsInfoModal**

- **Purpose:** Modal explaining what each pet stat means.
- **Inputs:**
  - `onClose` (function): Closes the modal
- **Outputs:**
  - Renders a modal with stat descriptions
  - Calls `onClose` when background or close button is clicked
- **Usage:** Child of `AlivePetProfile`, rendered when user clicks "?" button.

---
