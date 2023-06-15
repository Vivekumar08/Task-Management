/* eslint-disable react/prop-types */

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

const AddTask = ({ id }) => {
  const navigate = useNavigate();
  // const URL = "http://localhost:5500";
  const URL = "https://task-management-9ni1.onrender.com";
  const handleSubmit = async (values) => {
    const response = await fetch(`${URL}/task/?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      navigate("/"); // Navigate to the login page if not logged in
    } else {
      window.alert("There is some problem in server!!");
    }
  };

  return (
    <div className="container">
      <h2>Add Task</h2>
      <Formik
        initialValues={{ title: "", description: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Title is required";
          }
          if (!values.description) {
            errors.description = "Description is required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" className="form-control" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary my-2"
              disabled={isSubmitting}
            >
              Add Task
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;
