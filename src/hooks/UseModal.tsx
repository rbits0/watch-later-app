// Modified from https://github.com/picocss/examples/blob/master/v2-react-color-schemes-and-modal/src/contexts/ModalContext.js

import { useCallback, useEffect, useState } from "react";


// Returns [modalIsOpen, handleOpen, handleClose]
function useModal(): [boolean, () => void, () => void] {
  const isSSR = typeof window === "undefined";
  const htmlTag = !isSSR && document.querySelector("html");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalAnimationDuration = 0;


  // Handle open
  const handleOpen = () => {
    if (htmlTag) {
      setModalIsOpen(true);
      htmlTag.classList.add("modal-is-open", "modal-is-opening");

      setTimeout(() => {
        htmlTag.classList.remove("modal-is-opening");
      }, modalAnimationDuration);
    }
  };


  // Handle close
  const handleClose = useCallback(() => {
    if (htmlTag) {
      htmlTag.classList.add("modal-is-closing");

      setTimeout(() => {
        setModalIsOpen(false);
        htmlTag.classList.remove("modal-is-open", "modal-is-closing");
      }, modalAnimationDuration);
    }
  }, [htmlTag]);


  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!modalIsOpen) return;
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, modalIsOpen]);


  return [modalIsOpen, handleOpen, handleClose];
};

export { useModal };
