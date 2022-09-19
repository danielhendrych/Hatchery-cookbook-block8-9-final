import React, { useState, useEffect, useContext } from "react";
import Icon from "@mdi/react";
import { mdiLoading, mdiPencilOutline } from "@mdi/js";
import { Modal, Form,} from "react-bootstrap";
import Button from "react-bootstrap/Button";


function FormRecipe(props) {

  const [validated, setValidated] = useState(false);
  const [recipeCall, setRecipeCall] = useState({ state: "inactive" });
  const [isShown, setIsShown] = useState({ state: false });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [],
  });

  const defaultForm = {
    name: "",
    description: "",
    ingredients: [],
  };

  const recipes = props.recipes;

  const onComplete = props.onComplete;

  const ingredients = props.ingredients


  useEffect(() => {
    if (recipes) {
      setFormData({
        name: recipes.name,
        description: recipes.description,
        ingredients: recipes.ingredients,
      });
    }
  }, [recipes]);

  const emptyIngredient = () => {
    return { amount: 0, unit: "", id: "" };
  };

  const addEmptyIngredient = () => {
    const newFormData = {
      ...formData,
      ingredients: [...formData.ingredients, emptyIngredient()],
    };
    setFormData(newFormData);
  };

  function removeIngredient(index) {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);

    const newFormData = {
      ...formData,
      ingredients: newIngredients,
    };
    setFormData(newFormData);
  }

  const sortedIngredientsList = ingredients.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const setIngredientField = (inputName, value, index) => {
    return setFormData((formData) => {
        const newData = {...formData}

  
        newData.ingredients[index][inputName] = value
        return newData
    })
}

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    const newData = { ...formData };
    newData.ingredients.forEach((ing) => {
      ing.amount = parseFloat(ing.amount);
    });

    const payload = { ...newData, 
      id: recipes ? recipes.id : null };

    setRecipeCall({ state: "pending" });
    const res = await fetch(`recipe/${recipes ? "update" : "create"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.status >= 400) {
      setRecipeCall({ state: "error", error: data });
    } else {
      console.log(data);
      setRecipeCall({ state: "success", data });
    }

    if (typeof onComplete === "function") {
      onComplete(data);
    }

    handleCloseModal();

    console.log(formData);
  };



  const handleShowModal = (data) => setIsShown({ state: true, data });
  const handleCloseModal = () => {
    setFormData(defaultForm);
    setIsShown({ state: false });
    setRecipeCall({ state: "inactive" });
    setValidated(false);
  };

  const ingredientInputGroup = (ingredient, index) => {
    return (
      <div key={index} className={"d-flex justify-content-center gap-1"}>
        <Form.Group className="mb-1 w-75" controlId="ingredients">
          <Form.Label>Ingredience</Form.Label>
          <Form.Select
            value={ingredient.id}
            onChange={(e) => setIngredientField("id", e.target.value, index)}
            required
          >
            <option></option>
            {sortedIngredientsList.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Zadejte ingredienci!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1" controlId="amount">
          <Form.Label>Počet</Form.Label>
          <Form.Control
            type="number"
           
            value={formData.ingredients[0].amount}
            min={1}
            max={100}
            required
            onChange={(e) =>
              setIngredientField("amount", parseInt(e.target.value), index)
              
            }
          />
          <Form.Control.Feedback type="invalid">
           Zadejte počet!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1" controlId="unit">
          <Form.Label>Jednotka</Form.Label>
          <Form.Select
            value={ingredient.unit}
            onChange={(e) => setIngredientField("unit", e.target.value, index)}
            required
            
          >
              <option></option>
              <option>ks</option>
              <option>kg</option>
              <option>g</option>
              <option>ml</option>
              <option>l</option>
              <option>cm</option>
              <option>polévková lžíce</option>
              <option>čajová lžička</option>
              <option>hrnek</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
           Zadejte jednotku!
          </Form.Control.Feedback>
        </Form.Group>
        
        <Button onClick={() => removeIngredient(index)} style={{ marginBottom: "8px" }}>X</Button>
      </div>
    );
  };

  return (
    <>
      <Modal show={isShown.state} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{recipes ? "Změna receptu" : "Nový recept"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            id={"form"}
            onSubmit={(e) => handleSubmit(e)}
          >
            <Form.Group className="mb-3" controlId="recipeName">
              <Form.Label>Název</Form.Label>
              <Form.Control
                value={formData.name}
                maxLength={50}
                required
                onChange={(e) => setField("name", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Zadejte název.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Postup</Form.Label>
              <Form.Control
                value={formData.description}
                required
                as="textarea"
                onChange={(e) => setField("description", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Nezapomeňte na postup!
              </Form.Control.Feedback>
            </Form.Group>

            {formData.ingredients.map((ing, index) => {
              return ingredientInputGroup(ing, index);
            })}

            <Button onClick={addEmptyIngredient}>Přidej ingredienci</Button>

            <Modal.Footer>
              <div className="d-flex flex-row gap-2">
                <div>
                  {recipeCall.state === "error" && (
                    <div className="text-danger">
                      Error: {recipeCall.error.errorMessage}
                    </div>
                  )}
                </div>
                <Button
                  variant="secondary"
                  onClick={handleCloseModal}
                >
                  Zavřít
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={recipeCall.state === "pending"}
                >
                  {recipeCall.state === "pending" ? (
                    <Icon size={0.8} path={mdiLoading} spin={true} />
                  ) : recipes ? (
                    "Změnit"
                  ) : (
                    "Přidat"
                  )}
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
<div>
     {recipes ? (
       <div className={"d-flex w-100 justify-content-end"}>
          <Button onClick={handleShowModal} variant={"light"} size={"sm"}>
            <Icon size={1} path={mdiPencilOutline} />
          </Button>
        </div>
) : (
        <Button
          onClick={handleShowModal}
          variant="primary"
          size="sm"
       
        >
          Vytvořit recept
        </Button>
      )}
   
</div>
    </>
  );
}

export default FormRecipe;