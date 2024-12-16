import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ModalHandle, ModalProps } from './Modal.model';

export const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ header, content, footer }, ref) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(ref, () => ({
      openModal() {
        modalRef.current?.showModal();
      },
      closeModal() {
        modalRef.current?.close();
      },
    }));

    return (
      <dialog
        ref={modalRef}
        id="my_modal"
        className="modal"
        onCancel={() => console.log('test')}
      >
        <div className="modal-box px-4 py-1">
          {header && (
            <section
              id="header"
              className="text-center text-xl font-bold py-3 text-white"
            >
              {header}
            </section>
          )}

          {content && (
            <section
              id="content"
              className="flex flex-col justify-center gap-3 "
            >
              {content}
            </section>
          )}

          {footer && (
            <>
              <section id="footer">{footer}</section>
            </>
          )}
        </div>
      </dialog>
    );
  },
);
