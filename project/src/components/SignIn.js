import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Divider, Form, FormField, Header } from 'semantic-ui-react';
import { signIn,logIn } from "../services/userService"

const schema = yup
  .object({
    Name: yup.string().required('שדה חובה'),
    Phone: yup.string().required('שדה חובה').min(9, 'לפחות 9 ספרות ').max(10, '  עד 10 ספרות '),
    Email: yup.string().required('שדה חובה').email('המייל אינו חוקי'),
    Tz: yup.string().required('שדה חובה').min(9, ' 9 ספרות ').max(9, '9 ספרות '),
    Username: yup.string().required('שדה חובה'),
    Password: yup.string().required('שדה חובה').min(3, 'סיסמא חייבת להכיל לפחות 3 ספרות'),
  })
  .required()


export default function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state } = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Username: state?.Username,
      Password: state?.Password,
    },
  })
  let d;
  const onSubmit = (data) => {
    dispatch(signIn(data,navigate))
  }
  return (
    <div id="form" class="ui placeholder segment">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="ui one column very relaxed stackable grid">
          <div class="column">
            <div class="ui form">
              <div class="field">
                <label>שם משתמש:</label>
                <div class="ui rigth icon input">
                  <input placeholder="הכנס שם משתמש"{...register("Username")} />
                  <i class="user icon"></i>
                </div>
                {errors.Username && <p class="ui pointing red basic label">{errors.Username?.message}</p>}
              </div>
              <div class="field">
                <label>סיסמא:</label>
                <div class="ui rigth icon input">
                  <input type="password" placeholder="הכנס סיסמא" {...register("Password")} />
                  <i class="lock icon"></i>
                </div>
                {errors.Password && <p class="ui pointing red basic label">{errors.Password?.message}</p>}
              </div>
              <div class="field">
                <label>שם:</label>
                <div class="ui rigth icon input">
                  <input placeholder="הכנס שם"{...register("Name")} />
                  <i class="user icon"></i>
                </div>
                {errors.Name && <p class="ui pointing red basic label">{errors.Name?.message}</p>}
              </div>
              <div class="field">
                <label>טלפון:</label>
                <div class="ui rigth icon input">
                  <input placeholder="הכנס טלפון" {...register("Phone")} />
                  <i class="phone icon"></i>
                </div>
                {errors.Phone && <p class="ui pointing red basic label">{errors.Phone?.message}</p>}
              </div>
              <div class="field">
                <label>מייל:</label>
                <div class="ui rigth icon input">
                  <input placeholder="הכנס מייל"{...register("Email")} />
                  <i class="mail icon"></i>
                </div>
                {errors.Email && <p class="ui pointing red basic label">{errors.Email?.message}</p>}
              </div>
              <div class="field">
                <label>מספר תעודת זהות:</label>
                <div class="ui rigth icon input">
                  <input placeholder="הכנס מספר תעודת זהות" {...register("Tz")} />
                  <i class="lock icon"></i>
                </div>
                {errors.Tz && <p class="ui pointing red basic label">{errors.Tz?.message}</p>}
              </div>
              <Button class="ui blue submit button" type="submit">הרשמה</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
