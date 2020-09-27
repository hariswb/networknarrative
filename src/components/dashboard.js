import React,  {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Chart from "./chart.js"
import Menu from "./menu.js"
import lesmischars from "../data/lesmischars.json"
import lesmisgraph from "../data/lesmisgraph.json"

const lesmisChars = JSON.parse(lesmischars)
const lesmisGraph = lesmisgraph

const categories = [	
				"plot_summary", 
				"degree_centrality", 
				"eigenvector_centrality", 
				"betweenness_centrality", 
				"closeness_centrality",
				"community", 
				"shortest_path",
				"spanning_tree",
				]

const highestOfCategories = {}
categories.forEach((x)=>{
	highestOfCategories[x]= lesmisChars.map(b=>b[x])
	  						.sort((a,b)=>a-b)[lesmisChars.length-1]
	}
)

function Dashboard(props) {
	const [category,setCategory] =useState("plot_summary")
	const [focus,setFocus]=useState("")
	
	function handleFocus(d){ 
		setFocus(d)
	}

	function handleCategory(d){ 
		setCategory(d)
	}
	
	return (
	  	<div className="container">
	  		<Menu 
	  			focus = {focus}
	  			category = {category}
	  			categories={categories}
	  			chars = {lesmisChars}
	  			graph = {lesmisGraph}
	  			onCategory = {(d)=>handleCategory(d)}
	  		/>

	  		<div className="chartbox">
		  		<Chart nodes={lesmisChars}
		  			   edges={lesmisGraph["edges"]}
		  			   spanning_tree={lesmisGraph["spanning_tree"]}
		  			   category={category}
		  			   highest={highestOfCategories}
		  			   onFocusChange={(d)=>handleFocus(d)}
		  			   shortest_path_edges={lesmisGraph.shortest_path}
		  			   shortest_path_nodes={lesmisGraph.shortest_path_nodes}
		  			   />
	  		</div>
	  	</div>
	);

}



export default Dashboard;