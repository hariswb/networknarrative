import React,  {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import Chart from "./chart.js"
import Menu from "./menu.js"
import CharInfo from "./charinfo.js"

import lesmischars from "../data/lesmischars.json"
import lesmisgraph from "../data/lesmisgraph.json"
import spanning_tree from "../data/spanning_tree.json"

const data = lesmisgraph
data["characters"] = JSON.parse(lesmischars)
data["spanning_tree"]=spanning_tree.spanning_tree

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
	const [chartSize, setChartSize] = useState({width: window.innerWidth-300 < 800? window.innerWidth-300:800, height:window.innerHeight*0.9})
	
	function handleFocus(d){ 
		setFocus(d)
	}

	function handleCategory(d){ 
		setCategory(d)
	}

	//handle window resize

	function debounce(fn, ms) {
	  let timer
	  return _ => {
	    clearTimeout(timer)
	    timer = setTimeout(_ => {
	      timer = null
	      fn.apply(this, arguments)
	    }, ms)
	  };
	}

	useEffect(()=>{
		const debouncedHandleResize = debounce(function handleResize(){
			setChartSize({
				width:window.innerWidth-300 < 800? window.innerWidth-300:800,
				height: window.innerHeight*0.9,
			})
		}, 1000)
		window.addEventListener('resize', debouncedHandleResize)
		return _ => {
      		window.removeEventListener('resize', debouncedHandleResize)
    	}
		
	})	

	// console.log(chartSize)
	return (
	  	<div className="grid-container" >
	  		<div className="item1">
		  		<Menu 
		  			focus = {focus}
		  			category = {category}
		  			categories={categories}
		  			chars = {data.characters}
		  			data = {data}
		  			onCategory = {(d)=>handleCategory(d)}
		  		/>
	  		</div>
	  		
	  		<div className="item2">
			  	<Chart nodes={data.characters}
			  		edges={data["edges"]}
			  		spanning_tree={data["spanning_tree"]}
			  		category={category}
			  		highest={highestOfCategories}
			  		onFocusChange={(d)=>handleFocus(d)}
			  		shortest_path_edges={data.shortest_path}
			  		shortest_path_nodes={data.shortest_path_nodes}
			  		chartSize={chartSize}
			  	/>
	  		</div>

	  		<div className="item3">
			  	<CharInfo
		  			focus = {focus}
		  			chars = {data.characters}
		  			chartSize={chartSize}
			  	/>
	  		</div>
	  	</div>
	);

}



export default Dashboard;