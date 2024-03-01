import { createPortal } from "react-dom";
import { useImperativeHandle, forwardRef, useRef } from "react";
import { useLockBodyScroll } from "@uidotdev/usehooks";

const Modal = forwardRef(function ModalCart({ children, onCloseCheckout }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={() => onCloseCheckout()}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
