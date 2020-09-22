import React from "react";
import ReactDOM from "react-dom";


function Dashboard(props) {
  return (
  	<div className="container">
  		<h1>Hello, {props.name}</h1>
  	</div>
  	);

}

export default Dashboard;