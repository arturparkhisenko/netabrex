import MuiModal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';

// FIXME, in future maybe replace it with Dialog and it's components like MuiDialogTitle and MuiDialogContent, for now it's not possible because of the findDOMNode usage which is deprecated in StrictMode.
// @see https://material-ui.com/components/dialogs/

export const Modal = ({ children, handleClose, isOpen }) => {
  return isOpen === true ? (
    <MuiModal onClose={handleClose} open={isOpen}>
      <div className="modal">
        <div className="modal__overlay">{children}</div>
      </div>
    </MuiModal>
  ) : null;
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};
