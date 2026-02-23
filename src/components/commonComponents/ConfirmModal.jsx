import "./ConfirmModal.css";

export const ConfirmModal = ({ onConfirm, onCancel, loading }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this product?</p>

        <div className="modal-actions">
          <button className="btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button
            className="btn delete-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
