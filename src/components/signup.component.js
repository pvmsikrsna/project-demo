import React from "react";
import {Form} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {APIs} from "../apis";

// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
// Schema for yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "*First Name must have at least 2 characters")
    .max(100, "*First Name can't be longer than 100 characters")
    .required("*First Name is required"),

  lastName: Yup.string()
    .min(2, "*Last Name must have at least 2 characters")
    .max(100, "*Last Name can't be longer than 100 characters")
    .required("*Last Name is required"),

  password: Yup.string()
    .min(5, "*Password must have at least 5 characters")
    .max(10, "*Password can't be longer than 10 characters")
    .required("*Password is required"),

  email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),

  phone: Yup.string()
    .matches(phoneRegExp, "*Phone number is not valid")
    .required("*Phone number required"),
  
  location: Yup.string()
    .min(2, "*Location must have at least 2 characters")
    .max(100, "*Location can't be longer than 100 characters")
    .required("*Location required"),
});
const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  location: "",

  // firstName: "Ravi",
  // lastName: "Krishna",
  // email: "ravi@email.com",
  // phone: "12311231",
  // password: "12341234",
  // location: "Hyderabad",
};
export default function Signup({onSignup}) {

  function renderInputControl(propName, placeholder, label, handleChange, handleBlur, values, touched, errors) {
    return <Form.Group controlId={propName}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={propName === 'password' ? 'password' : "text"}
        name={propName}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[propName]}
        className={touched[propName] && errors[propName] ? "error" : null}
      />
      {touched[propName] && errors[propName] ? (
        <div className="error-message">{errors[propName]}</div>
      ) : null}
    </Form.Group>;
  }

  let registerUser = (values, {setSubmitting, resetForm}) => {
    setSubmitting(true);
    let {firstName, lastName, email, phone, password, location} = values
    APIs.createUser(firstName, lastName, email, password, location, phone).then(x => {
      // alert(JSON.stringify(values, null, 2));
      resetForm();
      setSubmitting(false);
      onSignup(x)
    });
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema}
            onSubmit={registerUser}>
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (<Form onSubmit={handleSubmit}>
        <h3>Register</h3>
        {renderInputControl('firstName', 'First Name', 'First Name', handleChange, handleBlur, values, touched, errors)}
        {renderInputControl('lastName', 'Last Name', 'Last Name', handleChange, handleBlur, values, touched, errors)}
        {renderInputControl('email', 'Email', 'Email', handleChange, handleBlur, values, touched, errors)}
        {renderInputControl('password', 'Password', 'Password', handleChange, handleBlur, values, touched, errors)}
        {renderInputControl('location', 'Enter Location', 'Location', handleChange, handleBlur, values, touched, errors)}
        {renderInputControl('contact', 'Enter contact no', 'Contact No', handleChange, handleBlur, values, touched, errors)}

        <button type="submit" className="btn btn-dark btn-lg btn-block"
                disabled={isSubmitting}>Register
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">log in?</a>
        </p></Form>)
      }
    </Formik>
  );
}