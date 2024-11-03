interface DeleteDialogProps {
  open: boolean,
  closeCallback: () => void;
  confirmCallback: () => void;
}


function DeleteDialog({ open, closeCallback, confirmCallback}: DeleteDialogProps): JSX.Element {
  return (
    <dialog open={open}>
      <article className='confirm-dialog'>
        <b>Delete Videos?</b>
        <div role='group'>
          <button onClick={closeCallback} className='secondary'>Cancel</button>
          <button onClick={confirmCallback} className='delete-button'>Delete</button>
        </div>
      </article>
    </dialog>
  );
}


export default DeleteDialog;
