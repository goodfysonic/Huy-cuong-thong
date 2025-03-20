import { useState } from 'react';

export const useModal = (modalClass) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    const modalElement = document.querySelector(modalClass);
    setIsOpen(!isOpen);
    
    if (modalElement) {
      modalElement.classList.toggle('modal-menu--open', !isOpen);
    }
  };

  return [isOpen, toggleModal];
};