import React from "react";

/*This is the card component(child) recieving props from Home (parent) component
It displays the title and body in the form of card.*/

function Card({ title, body }) {
  return (
    <div className="card">
      <div className="header">
        <h3> Title: {title}</h3>
      </div>
      <div className="container">
        <p>Content: {body}</p>
      </div>
    </div>
  );
}

export default Card;
