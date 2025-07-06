# ModalOverlay.jsx

[⬅ Back to General Components](./General-Components.md)

---

## Overview

`ModalOverlay` is a reusable modal component for displaying content in a centered overlay above the main UI.  
It handles background click-to-close, keyboard accessibility, and a close button.  
Use this for any modal dialog, popup, or overlay in the app.

---

## API Reference

### Props

| Name       | Type       | Required | Description                                                            |
| ---------- | ---------- | -------- | ---------------------------------------------------------------------- |
| `onClose`  | `function` | Yes      | Called when the modal should close (background click or close button). |
| `children` | `node`     | Yes      | The modal content to display inside the overlay.                       |

---

## Usage

### Basic Example

```jsx
import ModalOverlay from "../../General-Components/Modal/ModalOverlay";

function ExampleModal({ open, onClose }) {
  if (!open) return null;
  return (
    <ModalOverlay onClose={onClose}>
      <div>
        <h2>Modal Title</h2>
        <p>This is the modal content.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </ModalOverlay>
  );
}
```

### How it works

- **Background click:** Clicking outside the modal content (on the overlay) will call `onClose`.
- **Close button:** The "×" button in the top-right calls `onClose`.
- **Keyboard:** The modal is focusable and accessible; you can add your own keyboard handlers for Escape, etc., if needed.
- **Content:** Pass any JSX as `children` to render inside the modal.

---

## Accessibility

- The modal overlay uses proper roles and can be navigated by keyboard.
- The close button has `aria-label="Close"` for screen readers.
- You can add `role="dialog"` and `aria-modal="true"` to the modal content if you want stricter accessibility compliance:

```jsx
<ModalOverlay onClose={onClose}>
  <div role="dialog" aria-modal="true">
    {/* ...modal content... */}
  </div>
</ModalOverlay>
```

---

## Styling

- The modal overlay and content are styled via `ModalOverlay.css`.
- By default, the modal sizes to fit its content.
- You can further style the content by passing a custom class to your children.

---

## Best Practices

- Always provide an `onClose` handler to allow users to dismiss the modal.
- Place modal components at the root of your page/component tree to avoid stacking issues.
- Use for all modal dialogs in the app for consistency.

---

_Last updated: 2025-07-06_
