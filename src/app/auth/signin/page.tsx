"use server";
//import { setCredentials } from "./authSlice";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Input from "@/components/Input/Input";
import { redirect } from "next/navigation";

const Login = () => {
  /*const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));*/

  async function signIn(formData: FormData) {
    "use server";

    const data = JSON.stringify(Object.fromEntries(formData));

    const rawFormData = {
      Email: formData.get("Email"),
      Password: formData.get("Password"),
    };

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      mode: "cors",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
      //body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (!res.ok) {
      return { message: data };
    }
    //const user = await login(formState).unwrap();
    //const userdata = await getuseradata(formState).unwrap();
    redirect("/postik");

    return res.json();
  }

  return (
    <Card>
      <form action={signIn} className="flex-center-col">
        <h3>Aвторизация</h3>
        <Input type="text" name="Email" label="Электронная почта или логин" />
        <Input type="password" name="Password" label="Пароль" />
        <Button type="submit">Авторизоватьсяs</Button>
        <div>
          <a href="/auth/signup">Зарегистрироваться</a>
        </div>
      </form>
    </Card>
  );
};

export default Login;
