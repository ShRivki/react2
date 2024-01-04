import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import * as actiontype from '../Store/actions'
import { Link, Outlet, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    Name: yup.string().required(),
    Phone: yup.string().required(),
    Email: yup.string().email().required(),
    Tz: yup.string().required().min(9).max(9).required(),
    Username: yup.string().required(),
    Password: yup.string().required().min(3),
  })
  .required()


export default function App() {
  const navigate=useNavigate()
  const dispach=useDispatch()
  const {state}=useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),})
  let d;
  const onSubmit = (data) => {
    axios.post("http://localhost:8080/api/user/sighin", data)
      .then((data) => {
        d = data.data
        dispach({ type: actiontype.LOG_IN, UserId: d.Id })       
        navigate("/");
        alert(d.Name + `שלום ל `);
      }).catch(() => {      
        navigate('/Login');
        alert("הינך רשום במערכת !!!!!");
      });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label><br/>
      <input placeholder="enter Name"{...register("Name")} />
      <p>{errors.Name?.message}</p>

      <label>Phone:</label><br/>
      <input placeholder="enter your Phone" {...register("Phone")} />
      <p>{errors.Phone?.message}</p>

      <label>Email:</label><br/>
      <input placeholder="enter your Email"{...register("Email")} />
      <p>{errors.Email?.message}</p>

      <label>Tz:</label><br/>
      <input placeholder="enter your Tz" {...register("Tz")} />
      <p>{errors.Tz?.message}</p> 

      <label>Username:</label><br/>
      <input placeholder="enter user name"{...register("Username")} value={state?.Username} />
      <p>{errors.Username?.message}</p>

      <label>Password:</label><br/>
      <input type="password"
       placeholder="enter password"{...register("Password")} value={state?.Password} />
      <p color="">{errors.Password?.message}</p>

      <button type="submit">הרשמה</button> 
    </form>
  )
}
