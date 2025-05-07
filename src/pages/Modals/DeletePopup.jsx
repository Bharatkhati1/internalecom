import React from "react";
import { Modal, Box, Typography } from "@mui/joy";
import "./Modal.scss"; // Your styling file, if any

const DeletePopup = ({
  open,
  setOpenModal,
  deleteAddress,
  selectedAddress,
}) => {
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: "12px",
          width: 400,
        }}
        className="delete-modal"
      >
        <div className="modal-header">
          <Typography level="h5" className="modal-title">
            Are you sure you want to delete?
          </Typography>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <Typography>
            This action will permanently delete this. Are you sure you
            want to continue?
          </Typography>
        </div>
        <div className="btn-group-box mt-3">
          <button
            className="btn btn-danger mt-0"
            onClick={() => {
              deleteAddress(selectedAddress.id);
              handleClose();
            }}
          >
            Yes, Delete
          </button>
          <button
            className="btn btn-secondary mt-0 ms-3"
            onClick={() => handleClose()}
          >
            Cancel
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeletePopup;
