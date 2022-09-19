import { Outlet, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./UserProvider";
import Button from "react-bootstrap/Button";



function App() {

  let navigate = useNavigate();
  const { isAuthorized, login } = useContext(UserContext);

  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            Chutné recepty
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Chutné recepty
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">

                
                <Nav.Link onClick={() => navigate("/RecipeList")}>
                  Recepty
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/IngredientList")}>
                  Ingredience
                </Nav.Link>
                <Button onClick={login} variant="danger">
            {isAuthorized ? "Odhlášení" : "Přihlášení"}
          </Button>{" "}
              </Nav>
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;
