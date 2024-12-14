import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { User, UserSignUpRequest, useSignupMutation } from "./authApiSlice";
import { useState } from "react";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const SignUp = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<UserSignUpRequest>({
    UserName: "",
    FirstName: "",
    LastName: "",
    Email: "",
    exp: 0,
    sub: "",
  });

  const [signUp, { isLoading }] = useSignupMutation();
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const onSubmit = async () => {
    try {
      await signUp(formState).unwrap();
      navigate("/login");
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
    }
  };

  return (
    <Sheet>
      <Stack spacing={2}>
        <Input
          type="text"
          name="UserName"
          placeholder="Логин"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Email"
          placeholder="Электронная почта"
          onChange={handleChange}
        />
        <Input
          type="password"
          name="Password"
          placeholder="Пароль"
          onChange={handleChange}
        />
        <Button onClick={onSubmit} loading={isLoading}>
          Зарегистрироваться
        </Button>
      </Stack>
    </Sheet>
  );
};

export default SignUp;
