import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/userService";

export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(logOut(navigate))
}
