import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";
import * as actiontype from '../Store/actions'
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
const schema = yup
  .object({
    Username: yup.string().required(),
    Password: yup.string().required().min(3),
  })
  .required()
export default function App() {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm({
    resolver: yupResolver(schema),
  })
  let d;
  const onSubmit = (data) => {
    axios.post("http://localhost:8080/api/user/login", data)
      .then((data) => {
        d = data.data
        console.log(d)
        dispach({ type: actiontype.LOG_IN, UserId: d.Id });
        navigate("/");
        alert(d.Name + `שלום ל `);
      }).catch(() => {
        navigate("/SignIn", { state: data });
        alert(`אינך רשום במערכת `);
      });
  };
  return (
    <div>
      <br />
      <Link to='/SignIn'> -אינך רשום??? לחץ להרשמה- </Link>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Usename:</label><br />
        <input placeholder="enter user name"{...register("Username")} />
        <p>{errors.Usename?.message}</p>
        <label>Password:</label><br />
        <input type="password" placeholder="enter password"{...register("Password")} />
        <p>{errors.Password?.message}</p>
        <button type="submit">התחברות</button>
      </form>
    </div>
  )
}