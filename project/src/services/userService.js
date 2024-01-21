import axios from "axios";
import * as actionType from '../Store/actions'
import Swal from "sweetalert2";
export const logIn = (data, navigate) => {
    return dispatch => {
        axios.post('http://localhost:8080/api/user/login', data)
             .then((d) => {
                dispatch({ type: actionType.LOG_IN, user: d.data.Id })
                navigate("/");
                Swal.fire({
                    position: "top",
                    title: d.data.Name + `שלום ל `,
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(() => {
                navigate("/SignIn", { state: data });
                Swal.fire({
                    position: "top",
                    title: ` אינך רשום במערכת  `,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

}
export const logOut = (navigate) => {
    return dispatch => {
        Swal.fire({
            title: "Oops...",
            showCancelButton: true,
            showDenyButton: false,
            confirmButtonText: "התנתק",
            cancelButtonText: "ביטול",
        }).then((r) => {
            if (r.isConfirmed) {
                dispatch({ type: actionType.LOG_OUT });
                Swal.fire({
                    title: "תודה שהייתם איתנו :)", showConfirmButton: false,
                    timer: 800
                });
            }
            navigate("/HomePage")

        })
    }
}
export const signIn = (data, navigate) => {
    // alert("dldjdj")
    return dispatch => {
        axios.post("http://localhost:8080/api/user/sighin", data)
            .then((d) => {
                // alert("dldjdj")
                dispatch({ type: actionType.LOG_IN, user: d.data.Id })
                Swal.fire({
                    position: "top",
                    title:  d.data.Name +` ברוכים הבאים`,
                    showConfirmButton: false,
                    timer: 1500
                }) 
                navigate("/");
            }).catch(() => {
                navigate('/Login');
                Swal.fire({
                    position: "top",
                    title: "הינך רשום במערכת !!!!!",
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }
}
