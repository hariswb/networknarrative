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

const highestOfCategories = {}
menu.forEach((x)=>{
	highestOfCategories[x]= lesmisChars.map(b=>b[x])
	  						.sort((a,b)=>a-b)[lesmisChars.length-1]
	}
)
// console.log(lesmisGraph)
function Dashboard(props) {
	const [graphCategory,setGraphCategory] =useState("plot_summary")
	const [focus,setFocus]=useState("")
	const menuButtons = menu.map(d=><li key={d}><button onClick={()=>setGraphCategory(d)}>{d}</button></li>)
	
	function handleChange(d){ 
		setFocus(d)
	}
	
	function getNodeInfo(charName){
		const charIndex= lesmisChars.findIndex(node=>node.character == charName)
		return charIndex >= 0? lesmisChars[charIndex].info:"none"
	}

	return (
	  	<div className="container">
	  		<div className="menu">
		  		<div><ul>{menuButtons}</ul></div>
		  		<div>
		  			<h4>{focus}</h4>
		  			<p>{getNodeInfo(focus)}</p>
		  		</div>
	  		</div>
	  		<div className="chartbox">
		  		<Chart nodes={lesmisChars}
		  			   edges={lesmisGraph["edges"]}
		  			   spanning_tree={lesmisGraph["spanning_tree"]}
		  			   category={graphCategory}
		  			   highest={highestOfCategories}
		  			   onChange={(d)=>handleChange(d)}
		  			   shortest_path_edges={lesmisGraph.shortest_path}
		  			   shortest_path_nodes={lesmisGraph.shortest_path_nodes}
		  			   />
	  		</div>
	  	</div>
	);

}



export default Dashboard;