import {
    useFormik,
    Formik,
    Form,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
} from "formik";
import type { FormikErrors, FieldHookConfig, FieldProps } from "formik";
import * as Yup from "yup";

import "./App.css";
import type React from "react";

function App() {
    return <FormikForm />;
}

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    paxNum: number;
}

// const validate = (values: FormValues) => {
//   const errors: FormikErrors<FormValues> = {};
//   if (!values.firstName) {
//     errors.firstName = 'Required';
//   } else if (values.firstName === 'invalid') {
//     errors.firstName = 'Your Name is Invalid';
//   }
// }

// const validate = (values: FormValues) => {
//     const errors: FormikErrors<FormValues> = {};
//     if (!values.firstName) {
//         errors.firstName = "Required";
//     } else if (values.firstName.toLowerCase() == "john") {
//         errors.firstName = "No Johns Please";
//     }

//     if (!values.lastName) {
//         errors.lastName = "Required";
//     }

//     if (!values.email) {
//         errors.email = "Required";
//     }

//     return errors;
// };

const yupschema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Too Short!")
        .max(5, "Too Long!")
        .test("no-johns", "No Johns Please", (value) => {
            if (!value) return true;
            return value.toLowerCase() !== "john";
        })
        .required("Required"),
    lastName: Yup.string()
        .min(2, "Too Short!")
        .max(5, "Too Long!")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
});

const handleSubmitFunc = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
};

const FormikForm = () => {
    // const formik = useFormik({
    //     initialValues: {
    //         firstName: "",
    //         lastName: "",
    //         email: "",
    //     },
    //     validationSchema: yupschema,
    //     onSubmit: handleSubmitFunc
    // });

    // console.log(formik.errors);

    // return (
    //     <form onSubmit={formik.handleSubmit}>
    //         <p>
    //             Hi {formik.values.firstName} {formik.values.lastName}{" "}
    //         </p>
    //         <pre>{JSON.stringify(formik.values)}</pre>
    //         <pre>{JSON.stringify(formik.errors)}</pre>
    //         <pre>{JSON.stringify(formik.touched)}</pre>

    //         <label htmlFor="firstName">First Name</label>
    //         <input
    //             id="firstName"
    //             name="firstName"
    //             type="text"
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}
    //             value={formik.values.firstName}
    //         />
    //         {formik.touched.firstName && formik.errors.firstName ? (
    //             <div>{formik.errors.firstName}</div>
    //         ) : null}
    //         <label htmlFor="lastName">Last Name</label>
    //         <input
    //             id="lastName"
    //             // name="lastName"
    //             type="text"
    //             // onChange={formik.handleChange}
    //             // onBlur={formik.handleBlur}
    //             // value={formik.values.lastName}
    //             {...formik.getFieldProps("lastName")}
    //         />
    //         <label htmlFor="email">Email Address:</label>
    //         <input
    //             id="email"
    //             name="email"
    //             type="text"
    //             onChange={formik.handleChange}
    //             value={formik.values.email}
    //         />

    //         <label>Submit Form</label>
    //         <button disabled={formik.isValid ? false : true} type="submit">
    //             Submit
    //         </button>
    //     </form>
    // );
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                paxNum: 0,
            }}
            validationSchema={yupschema}
            // onSubmit= { handleSubmitFunc}
            onSubmit={(values, { setSubmitting }) => {
                handleSubmitFunc(values);
                setSubmitting(false); //for async purposes
            }}
        >
            <ChildForm />
        </Formik>
    );
};

const ChildForm = () => {
    const { values, errors, touched, isValid,dirty } = useFormikContext<
        FormValues | undefined
    >();
    return (
        <Form>
            <p>
                Hi {values?.firstName} {values?.lastName}{" "}
            </p>
            <pre>{JSON.stringify(values)}</pre>
            <pre>{JSON.stringify(errors)}</pre>
            <pre>{JSON.stringify(touched)}</pre>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" />

            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />

            <ChildSelect label="Number of Pax" name="paxNum">
                <option value="">Select Number of Pax job type</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </ChildSelect>

            <button disabled={dirty && isValid ? false : true} type="submit">Submit</button>
        </Form>
    );
};

interface ChildSelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    children?: React.ReactNode;
}

const ChildSelect: React.FC<ChildSelectProps> = ({
    children,
    label,
    ...props
}) => {
    const [field, meta] = useField(props.name);

    return (
        <div>
            <label htmlFor={props.id ?? props.name}>{label}</label>
            <select {...field} {...props}>
                {children}
            </select>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default App;
