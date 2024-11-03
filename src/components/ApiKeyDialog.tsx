import { FormEvent, useEffect, useState } from "react";

interface ApiKeyDialogProps {
  open: boolean,
  closeCallback: () => void,
}


function ApiKeyDialog({ open, closeCallback }: ApiKeyDialogProps): JSX.Element {
  const [apiKey, setApiKey] = useState("");
  

  useEffect(() => {
    if (open) {
      let storedApiKey = localStorage.getItem("apiKey");
      setApiKey(storedApiKey ? storedApiKey : "");
    }
  }, [open]);


  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    localStorage.setItem("apiKey", apiKey);
    closeCallback();
  }
  
  
  return (
    <dialog open={open}>
      <article className="confirm-dialog">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="API Key"
          />
          <div className="grid">
            <button
              type="button"
              onClick={closeCallback}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit">Confirm</button>
          </div>
        </form>
      </article>
    </dialog>
  );
}


export default ApiKeyDialog;