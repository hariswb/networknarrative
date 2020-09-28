import React,  {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Chart from "./chart.js"
import Menu from "./menu.js"
import lesmischars from "../data/lesmischars.json"
import lesmisgraph from "../data/lesmisgraph.json"
import spanning_tree from "../data/spanning_tree.json"
 
const data = lesmisgraph
data["characters"] = JSON.parse(lesmischars)
data["spanning_tree"]=spanning_tree.spanning_tree
console.log(spanning_tree)

const categories = [
				"introduction",	
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
	highestOfCategories[x]= data.characters.map(b=>b[x])
	  						.sort((a,b)=>a-b)[data.characters.length-1]
	}
)

function Dashboard(props) {
	const [category,setCategory] =useState("introduction")
	const [focus,setFocus]=useState("")
	
	function handleFocus(d){ 
		setFocus(d)
	}

	function handleCategory(d){ 
		setCategory(d)
	}
	
	return (
	  	<div className="container" >
	  		<Menu 
	  			focus = {focus}
	  			category = {category}
	  			categories={categories}
	  			chars = {data.characters}
	  			data = {data}
	  			onCategory = {(d)=>handleCategory(d)}
		  		onFocusChange={(d)=>handleFocus(d)}

	  		/>

	  		<div className="chartbox">
		  		<Chart nodes={data.characters}
		  			   edges={data["edges"]}
		  			   spanning_tree={data["spanning_tree"]}
		  			   category={category}
		  			   highest={highestOfCategories}
		  			   onFocusChange={(d)=>handleFocus(d)}
		  			   shortest_path_edges={data.shortest_path}
		  			   shortest_path_nodes={data.shortest_path_nodes}
		  			   />
	  		</div>
	  	</div>
	);

}



export default Dashboard;