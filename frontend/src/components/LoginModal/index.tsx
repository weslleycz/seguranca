import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { BuyModal } from "../BuyModal";

export const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        fullWidth
        onClick={handleOpen}
        variant="contained"
        sx={{ marginTop: "50%" }}
        color="success"
      >
        Comprar Agora
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom component="div">
            Login
          </Typography>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Senha"
            type="password"
            id="password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <BuyModal handleCloseLoginModal={handleClose} />
        </Box>
      </Modal>
    </>
  );
};
