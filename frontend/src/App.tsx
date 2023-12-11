import { Box, Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { Head } from "./components/Head";
import { Hero } from "./components/Hero";
import { LoginModal } from "./components/LoginModal";
import { theme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head />
        <Container sx={{ mt: 2 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid sx={{ p: 1 }} item xs={6}>
              <Hero />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ background: "#F5F7FA" }} p={1} height={"380px"}>
                <Typography variant="h5" component="div">
                  Ingressos
                </Typography>
                <Typography variant="subtitle1" component="div">
                  Aqui você pode comprar os ingressos
                </Typography>
                <LoginModal />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
