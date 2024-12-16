import React, { useRef, useEffect } from 'react';
import '../styles/delete-popup.css';

const DeleteConfirmationPopup = ({ 
  isOpen, 
  onClose,
  loading, 
  onConfirm, 
  title = "Delete Confirmation", 
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel"
}) => {
  const popupRef = useRef(null);
  const overlayRef = useRef(null);

  // Handle clicking outside of the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside both the popup and the overlay
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target) &&
        overlayRef.current && 
        overlayRef.current === event.target
      ) {
        onClose();
      }
    };

    // Add event listener when popup is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent rendering if not open
  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="delete-popup-overlay"
    >
      <div 
        ref={popupRef}
        className="delete-popup-container"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="delete-popup-close-btn"
        >
          &times;
        </button>

        <div className="delete-popup-content">
          <h2 className="delete-popup-title">{title}</h2>
          <p className="delete-popup-message">{message}</p>

          <div className="delete-popup-actions">
            <button 
              onClick={onClose}
              className="delete-popup-cancel-btn"
            >
              {cancelText}
            </button>
            <button 
              onClick={()=>onConfirm(isOpen)}
              className="delete-popup-confirm-btn"
            >
                {loading ? "Deleting..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;