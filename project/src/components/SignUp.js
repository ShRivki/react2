import { useDispatch, useSelector } from "react-redux";
import * as actiontype from '../Store/actions'
export default ()=>{
    const dispach = useDispatch();
    dispach({ type: actiontype.LOG_OUT })
}