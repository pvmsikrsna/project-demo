import React from "react";
import {Button, Col, Row, Form} from "react-bootstrap";
import {withFormik} from "formik";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {APIs} from "../apis";

let schema = Yup.object().shape({
  description: Yup.string().required().ensure().min(3),
  severity: Yup.string().required().oneOf(['Major', 'Minor', 'Critical']),
  status: Yup.string().required().oneOf(['Open', 'Closed', 'In Progress']),
});

// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/


// Schema for yup
const validationSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, "*Description must have at least 10 characters")
    .max(200, "*Description can't be longer than 200 characters")
    .required("*Description is required"),
  severity: Yup.string().oneOf(['Major', 'Minor', 'Critical']).required(),
  status: Yup.string().oneOf(['Open', 'Closed', 'In Progress']).required(),
});

const INITIAL_VALUES = {
  description: "",
  severity: "Minor",
  status: "Open",
};

export default function NewIssue() {

  const renderInputControl = (propName, placeholder, label, handleChange, handleBlur, values, touched, errors) =>
    <Form.Group controlId={propName}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as={'textarea'}
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

  let registerNewIssue = (values, {setSubmitting, resetForm}) => {
    setSubmitting(true);
    let {firstName, lastName, email, phone, password, location} = values
    APIs.createUser(firstName, lastName, email, password, location, phone).then(x => {
      // alert(JSON.stringify(values, null, 2));
      resetForm();
      setSubmitting(false);
    });
  };

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema}
            onSubmit={registerNewIssue}>
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (<Form onSubmit={handleSubmit}>
        <h3>New Issue</h3>
        {renderInputControl('description', 'Description', 'Issue Description', handleChange, handleBlur, values, touched, errors)}

        <button type="submit" disabled={isSubmitting}
                className="btn btn-dark btn-lg btn-block">
          Create
        </button>
       </Form>)
      }
    </Formik>
  );
}