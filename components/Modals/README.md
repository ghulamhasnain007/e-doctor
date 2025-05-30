# Custom Modal Components

This directory contains custom modal components for the app that replace browser alerts with more user-friendly modal dialogs.

## Components

### BaseModal

The foundation modal component that provides the backdrop and basic styling.

### InfoModal

A simple modal for displaying information messages. Use this instead of `alert()` for providing feedback to users.

### ConfirmationModal

A modal with confirm and cancel options for confirming user actions. Use this instead of `Alert.alert()` for confirmation dialogs.

## Usage

The modal components are managed through the `ModalContext` which provides methods to show and hide modals from anywhere in the app.

### Show an information modal:

```javascript
import { useModal } from '@/context/ModalContext';

function MyComponent() {
  const { showInfo } = useModal();
  
  const handleAction = () => {
    // Execute some action
    
    // Show success message
    showInfo({
      title: 'Success',
      message: 'Your action was completed successfully!',
      buttonText: 'OK', // optional
      onClose: () => {
        // Optional callback when modal is closed
      }
    });
  };
}
```

### Show a confirmation modal:

```javascript
import { useModal } from '@/context/ModalContext';

function MyComponent() {
  const { showConfirmation } = useModal();
  
  const handleDeleteItem = () => {
    showConfirmation({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete', // optional
      cancelText: 'Cancel', // optional
      isDestructive: true, // optional, will use error color for the confirm button
      onConfirm: () => {
        // Execute the action when user confirms
        deleteItem();
      },
      onCancel: () => {
        // Optional callback when user cancels
      }
    });
  };
}
```

## Benefits over browser alerts

1. Consistent UI/UX across the app
2. Better styling that matches app theme
3. More control over user actions
4. Non-blocking interactions (unlike browser alerts)
5. Support for callbacks when modal is closed
