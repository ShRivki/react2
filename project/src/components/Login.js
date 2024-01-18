import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Divider, Form, FormField, Header } from 'semantic-ui-react';
import {logIn} from '../services/userService'
const schema = yup
  .object({
    Username: yup.string().required('שדה חובה'),
    Password: yup.string().required('שדה חובה').min(3, 'סיסמא חייבת להכיל לפחות 3 ספרות'),
  })
  .required()
export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  })
  // let d;
  const onSubmit = (data) => {
   dispatch(logIn(data,navigate)) ;
    // axios.post("http://localhost:8080/api/user/login", data)
    //   .then((data) => {
    //     d = data.data
    //     console.log(d)
    //     dispach(se(d.Id));
    //     navigate("/");
    //     // alert(d.Name + `שלום ל `);
    //     Swal.fire({
    //       position: "top",
    //       title: d.Name + `שלום ל `,
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }).catch(() => {
    //     navigate("/SignIn", { state: data });
    //     alert(`אינך רשום במערכת `);
    //     Swal.fire({
    //       position: "top",
    //       title: ` אינך רשום במערכת  `,
    //       showConfirmButton: false,
    //       timer: 1500
    //     })

    //   });
  };
  return <>
  <div id="form" class="ui placeholder segment">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="ui one column very relaxed stackable grid">
        <div class="column">
          <div class="ui form">
            <div class="field">
              <label>שם משתמש:</label>
              <div class="ui rigth icon input">
                <i class="user icon"></i>
                <input placeholder="הכנס שם משתמש"{...register("Username")} />

              </div>
              {errors.Username&&<p class="ui pointing red basic label">{errors.Username?.message}</p>}
            </div>
            <div class="field">
              <label>סיסמא:</label>
              <div class="ui rigth icon input">
                <i class="lock icon"></i>
                <input type="password" placeholder="הכנס סיסמא" {...register("Password")} />
              </div>
              {errors.Password&&<p class="ui pointing red basic label">{errors.Password?.message}</p>}
            </div>
            <Button class="ui blue submit button" type="submit">התחברות</Button>
          </div>
        </div>
      </div>
    </form>
  </div>
    <Link to='/SignIn'> -אינך רשום??? לחץ להרשמה- </Link>
  </>
}


{/* 
        <Form  >
          <FormField>
            <label>Username:</label>
            <input placeholder="enter user name"{...register("Username")} />
            <p>{errors.Username?.message}</p>
          </FormField>
          <FormField >
            <label>Password:</label>
            <input type="password" placeholder="enter password"{...register("Password")} />
            <p>{errors.Password?.message}</p>
          </FormField>
        </Form>
        <br /> */}

{/* <br />
        <br />
        <Button type="submit">התחברות</Button >
      </form>
    </div> */}