import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Select,
  Option,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@mui/joy";
import { postecomData } from "../../Services/ecomapiServices";

const AddPaymentMethod = ({ open, setOpen, onSave, fetchSavedPaymentMethod}) => {
  const [formData, setFormData] = useState({
    methodType: "card",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    upiId: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (formData.methodType === "card") {
      if (!formData.cardName.trim()) newErrors.cardName = "Card name is required";
      if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = "Card number must be 16 digits";
      if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = "Expiry must be MM/YY";
    } else if (formData.methodType === "upi") {
      if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(formData.upiId)) newErrors.upiId = "Invalid UPI ID format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleMethodTypeChange = (_, newValue) => {
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        methodType: newValue,
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        upiId: "",
      }));
      setErrors({});
    }
  };

  const HandleSaveDetails =async()=>{
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const res = await postecomData('/payment/save-method',{userId:userData.id,...formData})
    } catch (error) {
        console.error(error);
        
    }
  }

  const handleSubmit = () => {
    if (validate()) {
      HandleSaveDetails();
      setOpen(false);
      fetchSavedPaymentMethod();
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#fff",
          boxShadow: "md",
          p: 4,
          borderRadius: "sm",
        }}
      >
        <Typography level="h4" component="h2" mb={3}>
          Add Payment Method
        </Typography>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel>Payment Method</FormLabel>
          <Select value={formData.methodType} onChange={handleMethodTypeChange}>
            <Option value="card">Credit/Debit Card</Option>
            <Option value="upi">UPI</Option>
          </Select>
        </FormControl>

        {formData.methodType === "card" ? (
          <>
            <FormControl sx={{ mb: 2 }} error={!!errors.cardName}>
              <FormLabel>Cardholder Name</FormLabel>
              <Input
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                placeholder="Enter name on card"
              />
              {errors.cardName && <FormHelperText>{errors.cardName}</FormHelperText>}
            </FormControl>

            <FormControl sx={{ mb: 2 }} error={!!errors.cardNumber}>
              <FormLabel>Card Number</FormLabel>
              <Input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234567812345678"
                inputProps={{ maxLength: 16 }}
              />
              {errors.cardNumber && <FormHelperText>{errors.cardNumber}</FormHelperText>}
            </FormControl>

            <Grid container spacing={2}>
              <Grid xs={6}>
                <FormControl error={!!errors.cardExpiry}>
                  <FormLabel>Expiry (MM/YY)</FormLabel>
                  <Input
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    inputProps={{ maxLength: 5 }}
                  />
                  {errors.cardExpiry && <FormHelperText>{errors.cardExpiry}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </>
        ) : (
          <FormControl sx={{ mb: 2 }} error={!!errors.upiId}>
            <FormLabel>UPI ID</FormLabel>
            <Input
              name="upiId"
              value={formData.upiId}
              onChange={handleInputChange}
              placeholder="username@upi"
            />
            {errors.upiId && <FormHelperText>{errors.upiId}</FormHelperText>}
          </FormControl>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPaymentMethod;
