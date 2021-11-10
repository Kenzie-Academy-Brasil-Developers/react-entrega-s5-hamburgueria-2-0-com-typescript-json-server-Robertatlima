import TextField from "@mui/material/TextField";
import { Button, Grid, Link, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Provider/Auth";

interface UserData {
  email: string;
  password: string;
  name: string;
}

export const Register = () => {
  const { signUp } = useAuth();

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
    name: yup.string().required("Nome obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data: UserData) => {
    signUp(data);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={8} md={5} component={Paper}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmitFunction)}
            sx={{ mt: 1 }}
          >
            <TextField
              helperText={errors.email?.message}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              autoComplete="name"
              autoFocus
              {...register("name")}
            />
            <TextField
              helperText={errors.email?.message}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
            <TextField
              helperText={errors.password?.message}
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirmar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Já tem cadastro? Faça Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
