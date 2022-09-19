import React from "react";
import Table from "react-bootstrap/Table";

function ItemTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Název</th>
          <th>Popis</th>
        </tr>
      </thead>
      <tbody>
        {props.recipes.map((recipe) => {
          return (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ItemTableList;
