// import ReactModal from 'react-modal';
import { Audio } from 'react-loader-spinner';
import { Modal } from './Modal.Styled';

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
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </Modal>
  );
};