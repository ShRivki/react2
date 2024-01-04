import axios from "axios";
import 'semantic-ui-css/semantic.min.css';
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const ShoppingList = (userId) => {

    const nav = useNavigate()

    console.log(userId)

    const [data, setData] = useState([]);

    useEffect(() => {

        getData();

    }, [])

    const getData = () => {

        axios.get(`http://localhost:8080/api/bay/${userId.userId}`).

            then((x) => {

                console.log(x.data);

                setData(x.data)

            }).catch(err => console.log(err))

    }

    const deleted = (product) => {

        if(product.Count==1){
        axios.post(`http://localhost:8080/api/bay/delete/${product.Id}`)

            .then((x) => {

                console.log(x.data);

                alert("נמחק");

                getData();

            })

            .catch(err => console.log(err))
        }

    }

    return (

        <>

            {data?.map((product, index) => (

                <ul key={index}>

                    <li >

                        {product.Name}  {product.Type}  {product.Count}

                    </li>

                    <button onClick={() => deleted(product)}>-</button>

                </ul>

            ))}

        </>

    )

}

export default ShoppingList;