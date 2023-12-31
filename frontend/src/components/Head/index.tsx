import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Head = () => {
  return (
    <>
      {" "}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Compra de Ingressos
          </Typography>
          <Button onClick={() => alert("teste")} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
