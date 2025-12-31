import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "./App.css";

interface FormInputs {
    firstName: string;
    lastName: string;
    email: string;
    paxNum?: number; // otherwise yup will throw type exception
}

const yupschema = Yup.object().shape({
    firstName: Yup.string()
        .required("Required")
        .min(2, "Too Short!")
        .max(5, "Too Long!")
        .test("no-johns", "No Johns Please", (value) => {
            if (!value) return true;
            return value.toLowerCase() !== "john";
        }),
    lastName: Yup.string()
        .required("Required")
        .min(2, "Too Short!")
        .max(5, "Too Long!"),
    email: Yup.string().email("Invalid email").required("Required"),
    // paxNum: Yup.number().required("Required")
});

export default function App() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: yupResolver(yupschema),
        defaultValues: {
            firstName: "John",
        },
    });
    const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => console.log(`SUBMIT: ${JSON.stringify(data)}`);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>{JSON.stringify(watch())}</div>

            <label htmlFor="firstName">First Name</label>
            {/* <input type="text" {...register("firstName", { required: true, minLength:3, maxLength: 7})} /> */}
            <input type="text" {...register("firstName")} />

            {/* {errors.firstName && <span>This field is error</span>} */}
            <p>{errors.firstName?.message}</p>

            <label htmlFor="lastName">Last Name</label>
            <input type="text" {...register("lastName")} />
            {/* {errors.lastName && <span>This field is required</span>} */}
            <p>{errors.lastName?.message}</p>

            <label htmlFor="email">Email Address</label>
            <input type="text" {...register("email")} />
            <p>{errors.email?.message}</p>

            <label htmlFor="paxNum">Number of Pax</label>
            <select {...register("paxNum")}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <input type="submit" />
        </form>
    );
}
