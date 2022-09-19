import React, { useState, useMemo, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import ItemChange from "./ItemChange";
import ItemTableList from "./ItemTableList";
import FormRecipe from "./FormRecipe";
import UserContext from "../UserProvider";

function ListItem(props) {
  const [viewType, setViewType] = useState("list");
  const isToggled = viewType === "list";
  const [searchBy, setSearchBy] = useState("");
  const {isAuthorized} = useContext(UserContext)

  function toggler() {
    if (isToggled) {
      setViewType("table");
    } else {
      setViewType("list");
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }


  const filteredRecipes = useMemo(() => {
    return props.recipes.filter((input) => {
      return (
        input.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        input.description.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }, [searchBy, props.recipes]);

  

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse style={{ justifyContent: "right" }}>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                type="search"
                placeholder="Vyhledat"
                aria-label="Vyhledat"
              />
              <Button
                style={{ marginRight: "5px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
              <Button
                  style={{ marginRight: "10px" }}
                className={"d-none d-md-block"}
                variant="outline-primary"
                onClick={toggler}
              >
                {isToggled ? "Tabulka" : "Recepty"}
              </Button>
              {isAuthorized ? (<FormRecipe ingredients={props.ingredients} />) : ("")}
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {isToggled ? (
        <ItemChange recipes={filteredRecipes} ingredients={props.ingredients} />
      ) : (
        <ItemTableList recipes={filteredRecipes} />
      )}
    </div>
  );
}

export default ListItem;
