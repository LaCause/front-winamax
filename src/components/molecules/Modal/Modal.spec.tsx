import { render, cleanup } from '@testing-library/react';
import { Modal } from './Modal';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { ModalHandle } from './Modal.model';

describe('Modal', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it('rend les bons enfants', () => {
    const header = <div>Header</div>;
    const content = <div>Content</div>;
    const footer = <div>Footer</div>;
    const { getByText } = render(
      <Modal header={header} content={content} footer={footer} />,
    );
    expect(document.body.contains(getByText('Header'))).toBeTruthy();
    expect(document.body.contains(getByText('Content'))).toBeTruthy();
    expect(document.body.contains(getByText('Footer'))).toBeTruthy();
  });

  it('ne rend pas le modal lorsque les props sont vides', () => {
    const { container } = render(<Modal content="test" />);
    expect(container.children).toHaveLength(1);
  });

  it('ouvre le modal avec la fonction openModal', () => {
    const modalRef = React.createRef<ModalHandle>(); // Crée une ref typée

    render(<Modal ref={modalRef} content="test" />);

    modalRef.current?.openModal();

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it('ferme le modal avec la fonction closeModal', () => {
    const modalRef = React.createRef<ModalHandle>(); // Crée une ref typée

    render(<Modal ref={modalRef} content="test" />);

    modalRef.current?.closeModal();

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });
});
