"use server";
//import { setCredentials } from "./authSlice";
import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import Input from "@/components/Input/Input";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/lib/auth";

const Login = () => {
  /*const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));*/

  /*async function signIns(formData: FormData) {
    "use server";

    //const data = JSON.stringify(Object.fromEntries(formData));

    /*const rawFormData = {
      Email: formData.get("Email"),
      Password: formData.get("Password"),
    };*/

  /*const result = await signIn("credentials", {
      formData.get("Password"),
      formData.get("Password"),
    });*/

  /*if (result.ok) {
      const resjson = await res.json();
      console.log(resjson);
      const queryParamString = new URLSearchParams(resjson).toString();
      redirect(`http://localhost:3000/auth/login?"${queryParamString}`);
    } else {
      //setError(result.error);
    }*/

  /*const res = await fetch("http://localhost:5000/api/auth/login", {
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
    }*/
  //const user = await login(formState).unwrap();
  //const userdata = await getuseradata(formState).unwrap();

  /*const resjson = await res.json();
    console.log(resjson);
    const queryParamString = new URLSearchParams(resjson).toString();
    redirect(`http://localhost:3000/auth/login?"${queryParamString}`);

    return res.json();
  }*/

  async function login(formData: FormData) {
    "use server";
    console.log("signIn start");
    /*const res = await signIn("credentials", formData, {
      redirectTo: "http://localhost:3000/auth/login",
    });*/

    try {
      await signIn("credentials", formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return "Invalid credentials.";
          default:
            return "Something went wrong.";
        }
      }
      throw error;
    } finally {
      console.log("signIn end");
      const session = await auth();
      console.log(session);
      const jsonData = JSON.stringify({
        user: session!.user,
        token: session!.token,
      });
      const queryParamString = new URLSearchParams(jsonData).toString();
      redirect(`http://localhost:3000/auth/login?"${queryParamString}`);
    }
    //console.log(res);
    console.log("signIn end");
    const session = await auth();
    //redirect(`http://localhost:3000/auth/login`);
    console.log(session);
    const jsonData = JSON.stringify({
      user: session!.user,
      token: session!.token,
    });
    const queryParamString = new URLSearchParams(jsonData).toString();
    redirect(`http://localhost:3000/auth/login?"${queryParamString}`);
  }

  return (
    <Card>
      <form action={login} className="flex-center-col">
        <h3>Aвторизация</h3>
        <Input type="text" name="Email" label="Электронная почта или логин" />
        <Input type="password" name="Password" label="Пароль" />
        <Button type="submit">Авторизоваться</Button>
        <div>
          <a href="/auth/signup">Зарегистрироваться</a>
        </div>
      </form>
    </Card>
  );
};

export default Login;
