# User Flow

[⬅ Back to Main Docs](./FRONTEND_DOCS.md)

1. **Authentication**

   - Users can register and log in.
   - Auth state is managed globally; protected routes redirect unauthenticated users.

2. **Profile Page**

   - Users see a grid of their pets (alive and dead).
   - Can create new pets (modal form).
   - Can select a pet to play with.
   - Can toggle between alive and dead pets (with a toggle button).

3. **Game Page**

   - Interact with the selected pet: Feed, Play, Sleep, Clean.
   - Pet stats update in real time.
   - If a pet dies, user is redirected to the death screen.

4. **Death Screen**

   - Shows a tombstone, lifetime stats, and options to restart or exit.

5. **Other Pages**
   - Homepage, Gallery, Learn More, Credits, etc.

---
