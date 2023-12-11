import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Props = {
  handleCloseLoginModal: any;
};

export const BuyModal = ({ handleCloseLoginModal }: Props) => {
  const [open, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
    handleCloseLoginModal()
  };

  return (
    <>
      <Button
        onClick={() => handleOpen()}
        fullWidth
        variant="contained"
        color="primary"
      >
        Entrar
      </Button>

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            width: selected ? 400 : 780,
            padding: 16,
            backgroundColor: "white",
            borderRadius: 8,
            margin: "auto",
            marginTop: 100,
            height: selected ? 350 : 410,
          }}
        >
          {selected ? (
            <Box>
              <TextField
                label="Nome do titular do cartão"
                fullWidth
                margin="normal"
              />
              <TextField label="Numero do cartão" fullWidth margin="normal" />
              <TextField label="CVC*" fullWidth margin="normal" />
              <TextField label="CPF" fullWidth margin="normal" />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Comprar
              </Button>
            </Box>
          ) : (
            <Box id="cadeiras">
              <Grid container spacing={2}>
                {Array.from({ length: 5 }, (_, rowIndex) => (
                  <Grid key={rowIndex} item xs={12}>
                    <Typography
                      variant="h6"
                      align="center"
                    >{`Setor ${String.fromCharCode(
                      65 + rowIndex
                    )}`}</Typography>
                    <Grid container spacing={1}>
                      {Array.from({ length: 10 }, (_, seatIndex) => (
                        <Grid key={seatIndex} item xs={1}>
                          <Box>
                            <Button
                              onClick={() => setSelected(true)}
                              color="success"
                              id={`setor_${String.fromCharCode(
                                65 + rowIndex
                              )}_cadeira_${seatIndex + 1}`}
                              variant="contained"
                            >
                              {" "}
                              {seatIndex + 1}
                            </Button>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </div>
      </Modal>
    </>
  );
};
