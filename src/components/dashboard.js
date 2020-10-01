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
	const [chartSize, setChartSize] = 
			useState({  width: handleWidth(window.innerWidth), 
						height:window.innerHeight *0.95})
	
	function handleFocus(d){ 
		setFocus(d)
	}

	function handleCategory(d){ 
		setCategory(d)
	}

	function handleWidth(width){
		console.log(width)
		if(width> 600){
			return width-300 < 800? width-300:800
		}else{
			return width
		}
	}

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
				width:handleWidth(window.innerWidth),
				height: window.innerHeight *0.95,
			})
		}, 1000)
		window.addEventListener('resize', debouncedHandleResize)
		return _ => {
      		window.removeEventListener('resize', debouncedHandleResize)
    	}
		
	})	

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
		  			chartSize={chartSize}
		  		/>
	  		</div>
	  		
	  		<div className="item2">
			  	<Chart nodes={data.characters}
			  		edges={data["edges"]}
			  		spanning_tree={data["spanning_tree"]}
			  		category={category}
			  		highest={highestOfCategories}
			  		onFocusChange={(d)=>handleFocus(d)}
			  		focus={focus}
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