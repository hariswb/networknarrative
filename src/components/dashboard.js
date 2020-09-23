import React,  {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Chart from "./chart.js"
import lesmischars from "../data/lesmischars.json"

function Dashboard(props) {
	const data = JSON.parse(lesmischars)
	const mapdata = data.map(x=>x.character)
	console.log(mapdata)
	return (
	  	<div className="container">
	  		<h1>Hello, {props.name}</h1>
	  		<Chart/>
	  	</div>
	);

}

export default Dashboard;