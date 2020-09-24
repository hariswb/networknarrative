import React,  {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Chart from "./chart.js"
import lesmischars from "../data/lesmischars.json"
import lesmisgraph from "../data/lesmisgraph.json"

const lesmisChars = JSON.parse(lesmischars)
const lesmisGraph = lesmisgraph

const menu = [	
				"plot_summary", 
				"degree_centrality", 
				"eigenvector_centrality", 
				"betweenness_centrality", 
				"closeness_centrality",
				"community", 
				"shortest_path",
				"spanning_tree",
				]
// console.log(lesmisGraph)
function Dashboard(props) {
	const [graphCategory,setGraphCategory] =useState("plot_summary")

	const menuButtons = menu.map(d=><li key={d}><button onClick={()=>setGraphCategory(d)}>{d}</button></li>)
	return (
	  	<div className="container">
	  		<h1>Hello, {props.name}</h1>
	  		<div><ul>{menuButtons}</ul></div>
	  		<Chart nodes={lesmisChars}
	  			   edges={lesmisGraph["edges"]}
	  			   spanning_tree={lesmisGraph["spanning_tree"]}
	  			   category={graphCategory}
	  			   menu={menu}
	  			   />
	  	</div>
	);

}



export default Dashboard;