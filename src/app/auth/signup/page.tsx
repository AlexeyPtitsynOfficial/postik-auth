"use server";
import style from "../../styles/pages/signin.module.scss";
import { redirect } from "next/navigation";
import Input from "../../../components/Input/Input";
import Card from "../../../components/Card/Card";

const SignUp = () => {
  let errorText: string = "";

  async function createUser(formData: FormData) {
    "use server";

    const searchParams = new URLSearchParams(
      formData as unknown as Record<string, string>
    ).toString();

    const rawFormData = {
      UserName: formData.get("UserName"),
      Email: formData.get("Email"),
      Password: formData.get("Password"),
    };

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
    });

    if (!res.ok) {
      return { message: "Please enter a valid email" };
    }

    redirect("/auth/signin");

    return res.json();
    // mutate data
    // revalidate cache
  }

  /*let formData: UserSignUpRequest = {
    UserName: "",
    FirstName: "",
    LastName: "",
    Email: "",
    exp: 0,
    sub: "",
  };*/

  /*const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    (formData = { ...formData, [name]: value });*/

  return (
    <Card>
      <h3>Регистрация</h3>
      <div>{errorText}</div>
      <form action={createUser}>
        <Input type="text" name="UserName" label="Логин" />
        <Input type="text" name="Email" label="Электронная почта" />
        <Input type="password" name="Password" label="Пароль" />
        <button className="action-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </Card>
  );
};

export default SignUp;
