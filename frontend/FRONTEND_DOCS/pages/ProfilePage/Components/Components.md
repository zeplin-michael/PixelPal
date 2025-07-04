# Profile Page Components Structure

[⬅ Back to Profile Page](../ProfilePage.md)

---

## Component Structure (Tree)

```
ProfilePage.jsx
│
├── ProfileHeader (h2 + ToggleDeadButton)
│     └── [ToggleDeadButton](./ToggleDeadButton.md)
│
├── [PetGrid](./PetGrid.md)
│     └── [PetProfile](./PetProfile.md) (for each pet)
│           ├── [AlivePetProfile](./AlivePetProfile.md) (if pet is alive)
│           │     └── [StatsInfoModal](./StatsInfoModal.md) (modal, if open)
│           └── [DeadPetProfile](./DeadPetProfile.md) (if pet is dead)
│
├── [NoPetsMessage](./NoPetsMessage.md) (if no pets in current view)
│
└── [CreatePetForm](./CreatePetForm.md) (modal, only if showCreateModal && !showDead)
      ├── [AvatarSelector](./AvatarSelector.md)
      └── [ModalOverlay](./ModalOverlay.md)
```

---

## Component Index

- [ToggleDeadButton.jsx](./ToggleDeadButton.md)
- [PetGrid.jsx](./PetGrid.md)
- [PetProfile.jsx](./PetProfile.md)
- [ProfilePage.jsx](./ProfilePage.md)
- [CreatePetForm.jsx](./CreatePetForm.md)

---

**How to use:**

- Each link points to a detailed `.md` file for that component (to be created in the same folder).
- This file serves as the overview and navigation for all ProfilePage components.

---

_Last updated: 2025-07-03_
