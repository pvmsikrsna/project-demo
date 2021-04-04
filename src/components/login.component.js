import React from "react";
import {Form} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {APIs} from "../apis";
import {withRouter} from "react-router";

// Schema for yup
const validationSchema = Yup.object().shape({

  email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),

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

function Login(props, context) {

  const renderInputControl = (propName, placeholder, label, handleChange, handleBlur, values, touched, errors) =>
    <Form.Group controlId={propName}>
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


  let [errorMessage, setErrorMessage] = React.useState('');

  let loginUser = (values, {setSubmitting, resetForm}) => {
    setSubmitting(true);
    let {email} = values
    APIs.findUserByEmail(email).then(({data: users}) => {
      let user = users[0];
      setSubmitting(false);
      debugger
      if (!user) {
        setErrorMessage('No such user')
        resetForm();
        return
      }
      if (user.password !== values.password) {
        setErrorMessage('Invalid password')
        resetForm();
        return;
      } else {
        localStorage.setItem('user', user.email);
        if(props.onLogin){
          props.onLogin(user);
        }
      }
    });
  };

  let renderError = () => {
    return <div className={'login-error-wrapper'}>
        <span className={'login error-message'}>{errorMessage}</span>
    </div>
  }

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema}
            onSubmit={loginUser}>
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (<Form onSubmit={handleSubmit}>
        <h3>Login</h3>

        {renderInputControl('email', 'Email', 'Email', handleChange, handleBlur, values, touched, errors)}
        {renderInputControl('password', 'Password', 'Password', handleChange, handleBlur, values, touched, errors)}
          {renderError()}
      <button type="submit" className="btn btn-dark btn-lg btn-block"
                disabled={isSubmitting}>Login
        </button>

      </Form>)
      }
    </Formik>
  );
}

export default withRouter(Login);