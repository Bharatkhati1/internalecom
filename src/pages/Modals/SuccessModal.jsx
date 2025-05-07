import React from 'react';
import { Modal, Box, Typography } from "@mui/joy";

const SuccessModal = ({ 
  open, 
  onClose, 
  title, 
  message, 
  buttonText, 
  onButtonClick 
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
    >
      <Box className="success-modal">
        <div className="modal-header">
          <Typography id="success-modal-title" variant="h5" className="modal-title">
            {title}
          </Typography>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">
          <Typography id="success-modal-description" variant="body1" className="mb-4">
            {message}
          </Typography>
          <div className="btn-group-box">
            <button
              className="btn btn-primary"
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SuccessModal;