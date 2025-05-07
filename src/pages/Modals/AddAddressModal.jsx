import React, { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/joy";
import "./Modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faPlus,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import {
  postloginData,
  putUpdateAddressData,
} from "../../Services/loginApiServices";

const fields = [
  { name: "receiverName", placeholder: "Enter your name", label: "Full name" },
  { name: "receiverNumber", placeholder: "Mobile No.", label: "Mobile No." },
  { name: "buildingName", placeholder: "Address", label: "Address" },
  { name: "landmark", placeholder: "Landmark", label: "Landmark (Optional)" },
  { name: "district", placeholder: "city", label: "city" },
  { name: "zipcode", placeholder: "Zip Code", label: "Zip Code" },
  { name: "state", placeholder: "State", label: "State" },
  { name: "country", placeholder: "country", label: "country" },
];

const AddAddressModal = ({
  selectedAddress,
  isEditAddress,
  open,
  fetchUserData,
  setOpenModal,
}) => {
  const handleClose = () => {
    setOpenModal(false);
    setNewAddress({
      receiverName: "",
      receiverNumber: "",
      buildingName: "",
      district: "",
      state: "",
      zipcode: "",
      country: "",
      landmark: "",
    });
  };
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [newAddress, setNewAddress] = useState({
    receiverName: "",
    receiverNumber: "",
    buildingName: "",
    district: "",
    state: "",
    zipcode: "",
    country: "",
    landmark: "",
  });
  const [errors, setErrors] = useState({});
  // Handle New Address Form Input
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    let newErrors = {};
    if (!newAddress.receiverName.trim())
      newErrors.receiverName = "Receiver's Name is required.";
    if (!newAddress.receiverNumber.trim())
      newErrors.receiverNumber = "Mobile No. is required.";
    if (!newAddress.buildingName.trim())
      newErrors.address = "Building Name is required.";
    if (!newAddress.district.trim()) newErrors.district = "City is required.";
    if (!newAddress.state.trim()) newErrors.state = "State is required.";
    if (!newAddress.zipcode.trim()) newErrors.zipcode = "Zip Code is required.";
    if (!newAddress.country.trim()) newErrors.country = "country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAddress = async (e) => {
    if (!validateFields()) return;

    try {
      if (isEditAddress) {
        await putUpdateAddressData("/address/update", {
          userId: user.id,
          ...newAddress,
        });
      } else {
        const response = await postloginData(`/address/create`, {
          userId: user.id,
          ...newAddress,
        });
      }

      setNewAddress({
        receiverName: "",
        receiverNumber: "",
        address: "",
        district: "",
        state: "",
        zipcode: "",
        country: "",
        landmark: "",
      });
      fetchUserData();
      setOpenModal(false);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  useEffect(() => {
    if (isEditAddress == true) {
      setNewAddress({
        receiverName: selectedAddress.receiverName,
        receiverNumber: selectedAddress.receiverNumber,
        buildingName: selectedAddress.buildingName,
        district: selectedAddress.district,
        state: selectedAddress.state,
        zipcode: selectedAddress.zipcode,
        country: selectedAddress.country,
        landmark: selectedAddress.landmark,
      });
    } else {
      setNewAddress({
        receiverName: "",
        receiverNumber: "",
        buildingName: "",
        district: "",
        state: "",
        zipcode: "",
        country: "",
        landmark: "",
      });
    }
  }, [isEditAddress]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="add-address-modal">
        <div className="modal-header">
          <Typography level="h5" className="modal-title">
          { isEditAddress?"Edit Address": "Add Address"}
          </Typography>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="AddNewAddressBg">

          {fields.map(({ name, placeholder, label }) => (
            <div className="form-field mb-4" key={name}>
              <label>
                {label} <FontAwesomeIcon icon={faStarOfLife} />
              </label>
              <input
                type="text"
                name={name}
                value={newAddress[name]}
                onChange={handleAddressChange}
                placeholder={placeholder}
                className="form-control"
              />
            </div>
          ))}

          <div className="btn-group-box mt-3">
            <button
              className="btn btn-primary mt-0"
              onClick={handleSaveAddress}
            >
             {isEditAddress?"Update Address":"Save Address"}
            </button>
            <button
              className="btn btn-secondary mt-0 ms-3"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddAddressModal;
