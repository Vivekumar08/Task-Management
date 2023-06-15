import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../store/taskStore";
import { useState } from "react";

const NavBar = () => {
  // const URL = "http://localhost:5500";
  const URL = "https://task-management-9ni1.onrender.com";

  const [alerts1, setAlerts1] = useState(false);
  const [alertsMsg1, setAlertsMsg1] = useState(null);

  const loggedIn = useSelector((state) => state.users.loggedIn);
  const userDetails = useSelector((state) => state.users.userDetails);
  const dispatch = useDispatch();

  const deleteAcc = async () => {
    const response = await fetch(`${URL}/user/?id=${userDetails.userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(userLogout());
    } else {
      const data = response.json();
      setAlerts1(true);
      setAlertsMsg1(data.msg);
    }
  };
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container className="w-full">
          <Link to={"/"} className="text-decoration-none">
            <Navbar.Brand>Task Management App</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end "
          >
            <Nav className="mr-auto disabled">
              <NavDropdown
                title={<i className="fas fa-user"></i>}
                id="basic-nav-dropdown"
                disabled={loggedIn ? false : true}
              >
                <NavDropdown.Item>
                  <button onClick={() => deleteAcc()}>Delete Account</button>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <button onClick={() => dispatch(userLogout())}>Logout</button>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {alerts1 ? (
          <div className="alert alert-danger" role="alert">
            {alertsMsg1}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NavBar;
