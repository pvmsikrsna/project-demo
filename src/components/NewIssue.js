import React from "react";
import {Form, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import {APIs} from "../apis";
import {ISSUE_SEVERITY, ISSUE_STATUS} from "./utils";
import {noop} from "../utils";

// Schema for yup
const validationSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, "*Description must have at least 10 characters")
    .max(200, "*Description can't be longer than 200 characters")
    .required("*Description is required"),
  severity: Yup.string().oneOf(Object.values(ISSUE_SEVERITY)).required(),
  status: Yup.string().oneOf(Object.values(ISSUE_STATUS)).required(),
  created: Yup.date().required('*Created Date is required'),
  resolved: Yup.date(),
});

const INITIAL_VALUES = {
  description: "",
  severity: ISSUE_SEVERITY.MAJOR,
  status: ISSUE_STATUS.OPEN,
  // created: '2020-01-01',
  created: null,
  resolved: null,
};

export default ({issue = null, onSubmit = noop}) => {

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

  const renderCreatedDate = (propName, values, setFieldValue, touched, errors, onBlur) => {
    if(errors){
      console.log({errors})
    }
    return <Form.Group controlId={propName}>
      <Form.Label>Created</Form.Label>
      <Form.Control
        type={'date'}
        name={propName}
        placeholder={'Created'}
        onChange={(event) => {
          debugger
          setFieldValue(propName, event.target.value)
        }}
        onBlur={onBlur}
        value={values[propName]}
        className={touched[propName] && errors[propName] ? "error" : null}
      />
      {touched[propName] && errors[propName] ? (
        <div className="error-message">*Invalid created date</div>
      ) : null}
    </Form.Group>;
  };


  const renderResolvedDate = (propName, values, setFieldValue, touched, errors, onBlur) =>
    <Form.Group controlId={propName}>
      <Form.Label>Resolved</Form.Label>
      <Form.Control
        type={'date'}
        name={propName}
        placeholder={'Resolved'}
        onChange={(event) => {
          setFieldValue(propName, event.target.value)
        }}
        onBlur={onBlur}
        value={values[propName]}
        className={touched[propName] && errors[propName] ? "error" : null}
      />
      {touched[propName] && errors[propName] ? (
        <div className="error-message">*Invalid resolved date</div>
      ) : null}
    </Form.Group>;


  const renderIssueSeverity = (values, setFieldValue, touched, errors) => {
    let propName = 'severity'
    return <Form.Group controlId={propName}>
      <Form.Label>Issue Severity</Form.Label>
      <div>
        <ToggleButtonGroup type="checkbox" onChange={e => {
          setFieldValue(propName, e[1])
        }} value={values[propName]} className="mb-2">
          <ToggleButton value={ISSUE_SEVERITY.MAJOR}>Major</ToggleButton>
          <ToggleButton value={ISSUE_SEVERITY.MINOR}>Minor</ToggleButton>
          <ToggleButton value={ISSUE_SEVERITY.CRITICAL}>Critical</ToggleButton>
        </ToggleButtonGroup>
      </div>
      {touched[propName] && errors[propName] ? (
        <div className="error-message">{errors[propName]}</div>
      ) : null}
    </Form.Group>;
  };

  const renderIssueStatus = (values, setFieldValue, touched, errors) => {
    let propName = 'status'
    return <Form.Group controlId={propName}>
      <Form.Label>Issue Status</Form.Label>
      <div>
        <ToggleButtonGroup type="checkbox" onChange={e => {
          setFieldValue(propName, e[1])
        }} value={values[propName]} className="mb-2">
          <ToggleButton value={ISSUE_STATUS.OPEN}>Open</ToggleButton>
          <ToggleButton value={ISSUE_STATUS.IN_PROGRESS}>In Progress</ToggleButton>
          <ToggleButton value={ISSUE_STATUS.CLOSED}>Closed</ToggleButton>
        </ToggleButtonGroup>
      </div>
      {touched[propName] && errors[propName] ? (
        <div className="error-message">{errors[propName]}</div>
      ) : null}
    </Form.Group>;
  };

  let registerNewIssue = (values, {setSubmitting, resetForm}) => {
    onSubmit(issue, values, {setSubmitting, resetForm})
  };

  let renderNewIssueForm = (obj) => {
    let {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      setFieldValue
    } = obj
    return <Form onSubmit={handleSubmit}>
      <h3>New Issue</h3>
      {renderIssueSeverity(values, setFieldValue, touched, errors)}
      {renderIssueStatus(values, setFieldValue, touched, errors)}
      {renderCreatedDate('created', values, setFieldValue, touched, errors, handleBlur)}
      {renderResolvedDate('resolved', values, setFieldValue, touched, errors, handleBlur)}
      {renderInputControl('description', 'Description', 'Issue Description', handleChange, handleBlur, values, touched, errors)}
      <button type="submit" disabled={isSubmitting}
              className="btn btn-dark btn-lg btn-block register-issue">
        {issue ? 'Update Issue' : 'Register Issue'}
      </button>
    </Form>;
  };

  return (
    <Formik initialValues={issue || INITIAL_VALUES} validationSchema={validationSchema}
            onSubmit={registerNewIssue}>
      {renderNewIssueForm}
    </Formik>
  );
}