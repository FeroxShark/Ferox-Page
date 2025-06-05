import DOMPurify from 'dompurify';

export default function MessageModal({ message, onClose }) {
  if (!message) return null;
  return (
    <div
      id="messageModal"
      className="modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target.id === 'messageModal' && onClose()}
    >
      <div className="modal-content">
        <span className="modal-close-button" onClick={onClose}>
          &times;
        </span>
        <p
          id="modalMessageText"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }}
        />
      </div>
    </div>
  );
}
