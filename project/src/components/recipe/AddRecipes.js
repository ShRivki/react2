import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useLocation } from "react-router-dom"
import { getCategories } from "../../services/categoryService";
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'semantic-ui-react';
import { addCategory } from '../../services/categoryService'
import { editRecipe, addRecipe } from '../../services/recipeService'
import '../../App.css'
const schema = yup
    .object({
        Name: yup.string().required('שדה חובה'),
        CategoryId: yup.number('מספר בלבד').required('שדה חובה'),
        Img: yup.string().required('שדה חובה'),
        Duration: yup.number('מספר בלבד').required('שדה חובה'),
        Difficulty: yup.number('מספר בלבד').required('שדה חובה'),
        Description: yup.string(),
        Ingrident: yup.array().of(yup.object().shape({
            Name: yup.string().nullable(),
            Count: yup.string().nullable(),
            Type: yup.string().nullable(),
        })
        ),
        Instructions: yup.array(yup.string().nullable())
    })
export default () => {
    const navigate = useNavigate();
    const { state } = useLocation()
    // const { user } = useSelector(state => ({ 
    //     // user: state.userId
    //     user: state.user.user
    //  }));
    const { user, recipes, categories } = useSelector(state => ({
        user: state.user.user,
        categories: state.categories.categories,
        recipes: state.recipes.recipes
        // allRecipes: state.recipes
    }));
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        const recipe = { UserId: user, ...data, Id: state?.Id };
        state !== null && dispatch(editRecipe((recipe))) || state == null && dispatch(addRecipe(recipe));
        navigate('/Recipes');
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
    const [category, SetCategory] = useState("");
    useEffect(() => {
        dispatch(getCategories());
    }, [category]);
    return <><div id="container">
        <div id="form">
            <input type="text" placeholder="הכנס קטגוריה" name="category" onChange={(event) => {
                SetCategory(event.target.value)
            }} />
            <Button onClick={() => {
                // alert(category)
                dispatch(addCategory(category));
                //SetCategory(" ")
            }}>הוסף קטגוריה</Button>
        </div>
    </div>
        <div id="container">
            <div id="form" class="ui placeholder segment">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="ui one column very relaxed stackable grid">
                        <div class="column">
                            <div class="ui form">
                                <div>
                                    <div class="field">
                                        <p></p>
                                        <p></p>
                                        <label>שם עוגה:</label>
                                        <div class="ui rigth icon input">
                                            <input placeholder="שם עוגה"{...register("Name")} />
                                            <i class="user icon"></i>
                                        </div>
                                        {errors.Name && <p class="ui pointing red basic label">{errors.Name?.message}</p>}
                                    </div>

                                    <div class="field">
                                        <label>קטגוריה:</label>
                                        <select id="categories" {...register("CategoryId")}>
                                            {categories.map((x) =>
                                                <option value={x.Id}>{x.Name}</option>)}
                                        </select>
                                    </div>
                                    <div class="field">
                                        <label>קישור לתמונה:</label>
                                        <div class="ui rigth icon input">
                                            <input placeholder="הכנס קישור לתמונה"{...register("Img")} />
                                            <i class="linkify icon"></i>
                                        </div>
                                        {errors.Img && <p class="ui pointing red basic label">{errors.Img?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>רמת קושי:</label>
                                        <select id="Difficulty" {...register("Difficulty")}>
                                            <option value="1">קל</option>
                                            <option value="2">בנוני</option>
                                            <option value="3">קשה</option>
                                        </select>
                                        {errors.Difficulty && <p class="ui pointing red basic label">{errors.Difficulty?.message}</p>}
                                    </div>
                                    <div class="field">
                                        <label>משך זמן הכנה בדקות:</label>
                                        <div class="ui rigth icon input">
                                            <input placeholder="הכנס משך זמן הכנה"{...register("Duration")} />
                                            <i class="clock icon"></i>
                                        </div>
                                        {errors.Duration && <p class="ui pointing red basic label">{errors.Duration?.message}</p>}
                                    </div>
                                    <div class="field">
                                        {/* <Input Name="Description" errors={errors} register={register}label="תאור קצר:" placeholder="enter your Difficulty"/> */}
                                        <label>תאור קצר:</label>
                                        <div class="ui rigth icon input">
                                            <input placeholder="תאור קצר על המתכון"{...register("Description")} />
                                            <i class="edit icon"></i>
                                        </div>
                                        {errors.Description && <p class="ui pointing red basic label">{errors.Description?.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <h2>מוצרים:</h2>
                                    {fields.map((x, i) =>
                                        <div id="card">
                                            <div class="field">
                                                <label>{i + 1} שם מוצר :</label>
                                                <div class="ui rigth icon input">
                                                    <input placeholder="הכנס שם מוצר"  {...register(`Ingrident[${i}].Name`)} />
                                                    <i class="mail icon"></i>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label>כמות:</label>
                                                <div class="ui rigth icon input">
                                                    <input placeholder="הכנס כמות"  {...register(`Ingrident[${i}].Count`)} />
                                                    <i class="mail icon"></i>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label>סוג:</label>
                                                <div class="ui rigth icon input">
                                                    <input placeholder="Type"  {...register(`Ingrident[${i}].Type`)} />
                                                    <i class=" icon"></i>
                                                </div>
                                            </div>
                                        </div>, <br />
                                    )} <Button onClick={(e) => { e.preventDefault(); append({}) }}>הוספת מוצר</Button>
                                    <h2>הוראות:</h2>
                                    <div id="card">
                                        {fieldsInstructions.map((x, i) =>
                                            <div class="field">
                                                <label>הוראה: {i + 1}</label>
                                                <div class="ui rigth icon input">
                                                    <input placeholder="הכנס הוראה" {...register(`Instructions[${i}]`)} />
                                                    <i class="edit icon"></i>
                                                </div>
                                            </div>
                                        )} <Button onClick={(e) => { e.preventDefault(); appendInstructions(" ") }}>הוספת הוראה  </Button>
                                    </div><br />
                                </div>
                                <Button type="submit">שמירת מתכון</Button>
                            </div>
                        </div>
                    </div>
                </form >
            </div>

        </div>
    </>
}
