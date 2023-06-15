import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../store/taskStore";
import { useEffect, useState } from "react";

const UserForm = () => {
  const [alerts1, setAlerts1] = useState(false);
  const [alertsMsg1, setAlertsMsg1] = useState(null);

  const loggedIn = useSelector((state) => state.users.loggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const URL = "http://localhost:5500";
  const URL = "https://task-management-9ni1.onrender.com";

  const handleSubmit = async (values) => {
    const response = await fetch(`${URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.status == 200) {
      dispatch(userLogin(data));
      navigate("/");
    } else {
      setAlerts1(true);
      setAlertsMsg1(data.msg);
    }
  };
  const handleSubmitLogin = async (values) => {
    const response = await fetch(`${URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(userLogin(data));
      navigate("/");
    } else {
      setAlerts1(true);
      setAlertsMsg1(data.msg);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/"); // Navigate to the login page if not logged in
    }
  }, [loggedIn, navigate]);

  return (
    <div className="container">
      <h2>Sign-in Form</h2>
      {alerts1 ? (
        <div className="alert alert-danger" role="alert">
          {alertsMsg1}
        </div>
      ) : null}
      <Formik
        initialValues={{ name: "", email: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }
          if (!values.email) {
            errors.email = "Email is required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary my-2"
              disabled={isSubmitting}
            >
              Sign in
            </button>
          </Form>
        )}
      </Formik>

      <hr />
      <h2>Login Form</h2>

      <Formik
        initialValues={{ userId: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.userId) {
            errors.userId = "User ID is required";
          }
          return errors;
        }}
        onSubmit={handleSubmitLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <Field type="text" name="userId" className="form-control" />
              <ErrorMessage
                name="userId"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
