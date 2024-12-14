import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import TextField from "@mui/joy/TextField";
import { Form, useNavigate } from "react-router-dom";
import {
  LoginRequest,
  useLoginMutation,
  useGetuserDataMutation,
} from "./authApiSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Typography from "@mui/joy/Typography";
//import { setCredentials } from "./authSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const [getuseradata] = useGetuserDataMutation();

  const [formState, setFormState] = useState<LoginRequest>({
    Email: "",
    Password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await login(formState).unwrap();

      const userdata = await getuseradata(formState).unwrap();
      navigate("/postiki");
    } catch (error: unknown) {
      const err = error as FetchBaseQueryError;
      if (!err.data) {
        setErrorMsg("No server Response");
      } else if (err.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login failed");
      }
      //errRef?.current?.focus();
    }
  };

  return (
    <Sheet>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Input type="text" name="Email" onChange={handleChange} />
          <Input type="password" name="Password" onChange={handleChange} />
          <Button type="submit" loading={isLoading}>
            Авторизоваться
          </Button>
          <Typography component="a" href="/auth/signup">
            Зарегистрироваться
          </Typography>
        </Stack>
      </form>
    </Sheet>
  );
};

export default Login;
