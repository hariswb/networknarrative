import React,  {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Chart from "./chart.js"
import lesmischars from "../data/lesmischars.json"
import lesmisgraph from "../data/lesmisgraph.json"
function Dashboard(props) {
	const lesmisChars = JSON.parse(lesmischars)
	const lesmisGraph = lesmisgraph
	// console.log(lesmisChars)
	return (
	  	<div className="container">
	  		<h1>Hello, {props.name}</h1>
	  		<Chart nodes={lesmisChars}
	  			   edges={lesmisGraph["edges"]}
	  			   />
	  	</div>
	);

}

export default Dashboard;