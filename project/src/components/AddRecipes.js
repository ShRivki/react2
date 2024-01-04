import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import * as actiontype from '../Store/actions'
import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
const schema = yup
    .object({
        Name: yup.string().required("הכנס ערך"),
        CategoryId: yup.number("מספר בלבד").required("הכנס ערך"),
        Img: yup.string().required("הכנס ערך"),
        Duration: yup.number("מספר בלבד").required("הכנס ערך"),
        Difficulty: yup.number("מספר בלבד").required("הכנס ערך"),
        Description: yup.string(),
        Ingrident: yup.array().of(yup.object().shape({
            Name: yup.string().nullable(),
            Count: yup.string().nullable(),
            Type: yup.string().nullable(),
        })
        ),
        Instructions: yup.array(yup.string().nullable())
    })
const Input = ({ register, errors, label, name, placeholder }) => {
    return <>
        <label>{label}</label><br />
        <input placeholder={placeholder} {...register({ name })} /><br />
        <p>{errors[name]?.message}</p>
    </>
};
export default () => {
    const { state } = useLocation()
    const { user } = useSelector(state => ({ user: state.userId }));
    const dispach = useDispatch();
    const onSubmit = (data) => {
        const recipe = { UserId: user, ...data, Id: state?.Id };
        state !== null && dispach({ type: actiontype.EDIT_RECIPE, add: recipe }) || dispach({ type: actiontype.ADD_RECIPE, add: recipe }) ||
            console.log("אני פהההה")
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            Name: state?.Name,
            CategoryId: state?.CategoryId,
            Img: state?.Img,
            Duration: state?.Duration,
            Difficulty: state?.Difficulty,
            Description: state?.Description,
            Ingrident: state?.Ingrident,
            Instructions: state?.Instructions,
        },
    })
    const { fields, append } = useFieldArray({
        control,
        name: "Ingrident",
    });
    const { fields: fieldsInstructions, append: appendInstructions, } = useFieldArray({
        control,
        name: "Instructions",
    });
    const [categories, SetCategories] = useState([" "]);
    const [category, SetCategory] = useState("");
    useEffect(() => {

        axios.get("http://localhost:8080/api/category")
            .then((data) => {
                SetCategories(data.data);
            });
    }, [category]);
    return <>
        <input type="text" name="category" onChange={(event) => {
            SetCategory(event.target.value)
        }} />
        <button onClick={() => {
            axios.post("http://localhost:8080/api/category", {Name:category})
                .then((data) => {
                    alert(category + `נוספה לרשימת קטגוריה`)
                    SetCategory(" ")
                }).catch((data) => {
                    alert("ההוספה נכשלה")
                });
        }}>הוסף קטגוריה</button><br />

        <form onSubmit={handleSubmit(onSubmit)}>
            <br />
            {/* <Input name="Name" errors={errors} register={register} label="שם עוגה:" placeholder="enter name of cake"/> */}
            <label>שם עוגה:</label><br />
            <input placeholder="enter Name"{...register("Name")} />
            <p>{errors.Name?.message}</p>
            <label>קטגוריה:</label><br />
            <select id="categories" {...register("CategoryId")}>
                {categories.map((x) =>
                    <option value={x.Id}>{x.Name}</option>)}
            </select>
            <br />
            {/* <Input name="Img" errors={errors} register={register}label="קישור לתמונה:" /> */}
            <label>קישור לתמונה:</label><br />
            <input placeholder="enter  url of your Img"{...register("Img")} />
            <p>{errors.Img?.message}</p>
            <label>רמת קושי:</label><br />
            <select id="Difficulty" {...register("Difficulty")}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            {/* <Input Name="Duration" errors={errors} register={register}label="משך זמן בדקות:" placeholder="enter your duration" /> */}
            <p>{errors.Difficulty?.message}</p>
            <label>משך זמן בדקות:</label><br />
            <input placeholder="enter your duration"{...register("Duration")} />
            <p>{errors.Duration?.message}</p>
            {/* <Input Name="Description" errors={errors} register={register}label="תאור קצר:" placeholder="enter your Difficulty"/> */}
            <label>תאור קצר:</label><br />
            <input placeholder="enter your Difficulty"{...register("Description")} />
            <p>{errors.Description?.message}</p>
            {fields.map((x, i) =>
                <div>
                    <label>שם מוצר:</label><br />
                    <input placeholder="הכנס שם מוצר"  {...register(`Ingrident[${i}].Name`)} /><br />
                    <label>כמות:</label><br />
                    <input placeholder="הכנס כמות"  {...register(`Ingrident[${i}].Count`)} /><br />
                    <label>סוג:</label><br />
                    <input placeholder="Type"  {...register(`Ingrident[${i}].Type`)} /><br />
                    {/* <Input  name={`Ingrident.${i}.Name`} label="שם מוצר:"  placeholder="הכנס שם מוצר" register={`Ingrident.${i}.Name`} errors={errors}/> */}
                    {/* <Input name={`Ingrident.${i}.Count`} label="סוג:"  placeholder="Type" register={`Ingrident.${i}.Type`} errors={errors.Ingrident?.[i]?.errors}/> */}
                    {/* <input name={`Ingrident.${i}.Type`}  type="text" placeholder="Type" {...required(`Ingrident.${i}.Type`)}/><br /> */}
                </div>
            )} <button onClick={(e) => { e.preventDefault(); append({}) }}>הוספת מוצר</button>
            {fieldsInstructions.map((x, i) =>
                <div>
                    <label>הוראה:</label><br />
                    <input placeholder="הכנס הוראה" {...register(`Instructions[${i}]`)} /><br />
                </div>
            )} <button onClick={(e) => { e.preventDefault(); appendInstructions({}) }}>הוספת הוראה  </button>
            <br />
            <button type="submit">שמירת מתכון</button>
        </form >

    </>

}
