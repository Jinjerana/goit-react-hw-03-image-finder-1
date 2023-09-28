import ReactModal from 'react-modal';
import { Overlay, Modal } from './Modal.Styled';

export const ModalWindow = ({
  isOpen,
  onRequestClose,
  largeImageURL,
  tag,
  style,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <img
        src={largeImageURL}
        alt={tag}
        style={{
          overlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: '1200',
          },
          content: {
            color: 'lightsteelblue',
          },
        }}
      />
    </Modal>
  );
};
