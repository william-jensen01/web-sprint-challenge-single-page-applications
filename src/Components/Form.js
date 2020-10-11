import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const Form = () => {
    // set initial state of form
    const [pizzaInfo, setPizzaInfo] = useState({
       name: '',
       size: '',
       cheese: '',
       pepperoni: '',
       sausage: '',
       ham: '',
       pineapple: '',
       mushroom: '',
       specialInstructions: ''
    });

    // button is disabled by default
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

    // if form is valid then allow button to be clicked
    useEffect(() => {
        formSchema.isValid(pizzaInfo).then((valid) => {
            setButtonIsDisabled(!valid);
        });
    }, [pizzaInfo]);

    // set intial state of order
    // this will be used when displaying data back from api
    const [order, setOrder] = useState(null);

    // set initial state of errors
    const [errors, setErrors] = useState({
        name: '',
        size: '',
        cheese: '',
        pepperoni: '',
        sausage: '',
        ham: '',
        pineapple: '',
        mushroom: '',
        specialInstructions: ''
    })

        const formSchema = yup.object().shape({
        name: yup.string().test("len", "Name must be at least 2 characters", val => val.length > 2),
        size: yup.string().oneOf(["Small", "Medium", "Large"], "Please select a valid size.").required("Choose size."),
        cheese: yup.string(),
        pepperoni: yup.string(),
        sausage: yup.string(),
        ham: yup.string(),
        pineapple: yup.string(),
        mushroom: yup.string(),
        specialInstructions: yup.string()
    });

    // validating form
    const validateChange = (e) => {
        // grabbing formSchema and checking to see that every requirement is met
        yup
            .reach(formSchema, e.target.name)
            .validate(
                e.target.type === "checkbox" ? e.target.checked : e.target.value
            )
            .then((valid) => {
                // the input is passing!
                setErrors({...errors, [e.target.name]: ""});
            })
            .catch((err) => {
                // the input is breaking the schema
                console.log("error", err)
                setErrors({...errors, [e.target.name]: err.errors[0]});
            })
    }

    const submitForm = (e) => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", pizzaInfo)
            .then(res => {
                console.log(res);
                setOrder(res.data)
            });
        setPizzaInfo({
            name: '',
            size: '',
            cheese: false,
            pepperoni: false,
            sausage: false,
            ham: false,
            pineapple: false,
            mushroom: false,
            specialInstructions: ''
        });
    };

    const changeHandler = (e) => {
        e.persist();
        const newPizzaInfo = {
            ...pizzaInfo,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        }
        validateChange(e);
        setPizzaInfo(newPizzaInfo)
    };

    return (
        <div>
            <form onSubmit={submitForm}>
                {/* name section of form */}
                <label htmlFor="name">
                    Name:
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={pizzaInfo.name}
                        onChange={changeHandler}
                        data-cy="name"
                    />
                    {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                </label>

                {/* size section of form */}
                <label htmlFor="size">
                    Pick Your Size:
                    <select
                        value={pizzaInfo.size}
                        name="size"
                        id="size"
                        onChange={changeHandler}
                        data-cy="size"
                    >
                        <option value="">--Chose One--</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                    {errors.size.length > 0 ? <p className="error">{errors.size}</p> : null}
                </label>

                {/* cheese section of form */}
                <label htmlFor="cheese">
                    <input
                        type="checkbox"
                        id="cheese"
                        name="cheese"
                        checked={pizzaInfo.cheese}
                        onChange={changeHandler}
                        data-cy="cheese"
                    />
                    Cheese
                    {errors.cheese.length > 0 ? <p className="error">{errors.cheese}</p> : null}
                </label>

                {/* pepperoni section of form */}
                <label htmlFor="pepperoni">
                    <input
                        type="checkbox"
                        id="pepperoni"
                        name="pepperoni"
                        checked={pizzaInfo.pepperoni}
                        onChange={changeHandler}
                        data-cy="pepperoni"
                    />
                    Pepperoni
                    {errors.pepperoni.length > 0 ? <p className="error">{errors.pepperoni}</p> : null}
                </label>

                {/* sausage section of form */}
                <label htmlFor="sausage">
                    <input
                        type="checkbox"
                        id="sausage"
                        name="sausage"
                        checked={pizzaInfo.sausage}
                        onChange={changeHandler}
                        data-cy="sausage"
                    />
                    Sausage
                    {errors.sausage.length > 0 ? <p className="error">{errors.sausage}</p> : null}
                </label>

                {/* ham section of form */}
                <label htmlFor="ham">
                    <input
                        type="checkbox"
                        id="ham"
                        name="ham"
                        checked={pizzaInfo.ham}
                        onChange={changeHandler}
                        data-cy="ham"
                    />
                    Ham
                    {errors.ham.length > 0 ? <p className="error">{errors.ham}</p> : null}
                </label>

                {/* pineapple section of form */}
                <label htmlFor="pineapple">
                    <input
                        type="checkbox"
                        id="pineapple"
                        name="pineapple"
                        checked={pizzaInfo.pineapple}
                        onChange={changeHandler}
                        data-cy="pineapple"
                    />
                    Pineapple
                    {errors.pineapple.length > 0 ? <p className="error">{errors.pineapple}</p> : null}
                </label>

                {/* Mushroom section of form */}
                <label htmlFor="mushroom">
                    <input
                        type="checkbox"
                        id="mushroom"
                        name="mushroom"
                        checked={pizzaInfo.mushroom}
                        onChange={changeHandler}
                        data-cy="mushroom"
                    />
                    Mushroom
                    {errors.mushroom.length > 0 ? <p className="error">{errors.mushroom}</p> : null}
                </label>

                {/* special instructions section of form */}
                <label htmlFor="specialInstructions">
                    Special Instructions
                    <input
                        type="text"
                        id="specialInstructions"
                        name="specialInstructions"
                        value={pizzaInfo.specialInstructions}
                        onChange={changeHandler}
                        data-cy="instructions"
                    />
                    {errors.specialInstructions.length > 0 ? <p className="error">{errors.specialInstructions}</p> : null}
                </label>

                <button disabled={buttonIsDisabled} type="submit" data-cy="submit">Add to Order</button>
                {order &&<pre>{JSON.stringify(order, null, 2)}</pre>}
            </form>
        </div>
    );
}
export default Form;