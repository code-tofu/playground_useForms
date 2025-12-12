You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

Forgetting handleBlur: Cause: Formik typically updates the touched status on the onBlur event, not onChange. If you are using custom components and haven't attached Formik's handleBlur to your input's onBlur event, the field will never be marked as touched.

 React does not allow you to render objects. You should access the name property (which hold a renderable string) instead:

 Validate function must return an object which keys are symmetrical to our values/initialValues

 isValid is true by default. use dirty