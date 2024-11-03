interface DeleteDialogProps {
  open: boolean,
  onCancel: () => void;
  onConfirm: () => void;
}


function DeleteDialog({ open, onCancel, onConfirm }: DeleteDialogProps): JSX.Element {
  return (
    <dialog open={open}>
      <article className='confirm-dialog'>
        <b>Delete Videos?</b>
        <div role='group'>
          <button onClick={onCancel} className='secondary'>Cancel</button>
          <button onClick={onConfirm} className='delete-button'>Delete</button>
        </div>
      </article>
    </dialog>
  );
}


export default DeleteDialog;
