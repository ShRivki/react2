import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'semantic-ui-react';
import {logIn} from '../../services/userService'
import '../../App'
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
   
  };
  return<> <div id="container">
  <div id="form" class="ui placeholder segment">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div  class="ui one column very relaxed stackable grid">
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
    
  </div>
  <div id="container">
  <Link to='/SignIn' style={{color:"rgb(179 64 119)"}}> -אינך רשום??? לחץ להרשמה- </Link>
  </div>
  </>
}
