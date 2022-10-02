import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/firestore";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import "../styles/anonLogin.scss";

interface Form {
  email: string;
  name: string;
}

const AnonLogin: FC = () => {
  const history = useHistory();
  const { dispatch, redirectTo } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    shouldFocusError: true,
  });

  const submitHandler: SubmitHandler<Form> = (data, e) => {
    firebase.firestore().collection("anons").doc().set({
      username: data.name,
      email: data.email,
      loginTime: new Date(),
    });
    dispatch({ type: "ANON-LOGIN", payload: data });
    if (redirectTo) {
      history.push(redirectTo);
    } else {
      history.push("/");
    }
  };

  return (
    <main id="anon">
      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Enter Your Name!",
            maxLength: {
              value: 15,
              message: "Enter a shorter name or login!",
            },
          })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Enter Your Email!",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid e-mail address",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <button>Join In!</button>
        <p className="error login-please">
          You're Joining as a Guest, your name would have a guest tag associated
          to it and others will know that you aren't loged in, you can login
          using google/github to change that
        </p>
      </form>
    </main>
  );
};

export default AnonLogin;
