import React from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/Card.css";


function Item(props) {
  return (
    
      <Card className={styles.card}>
        <Card.Img src={props.recipe.imgUri} />
        <Card.Body>
          <div>
            <Card.Title>
              {props.recipe.name}
            </Card.Title>
          </div>
          <Card.Text style={{textAlign: "left"}}>
            {props.recipe.description}
          </Card.Text>
        </Card.Body>
      </Card>

  );
}

export default Item;



