import style from './ContactDeleteConfirmModal.module.css';

export const ContactDeleteConfirmModal = ({ onCancel, onDelete }) => {
  return (
    <div className={style.modal}>
      <div className={style.container}>
        <p>Delete contact?</p>
        <div className={style.controls}>
          <button onClick={onCancel} className={style.button}>
            Cancel
          </button>
          <button onClick={onDelete} className={style.button}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
