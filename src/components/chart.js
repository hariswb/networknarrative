import React, {useEffect,useState,useRef} from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3"

const drag = simulation => {
	function dragstarted(event) {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	}
	function dragged(event) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	}
	function dragended(event) {
		if (!event.active) simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;
	}
	return d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);
}

const nodeColor=(category,highest,shortest_path_nodes)=> {
	const colorScheme = {
		"introduction": d3.schemeDark2[0],
		"plot_summary": d3.schemeDark2[0],
		"community":(d)=>getColor(d,"interpolateTurbo"),
		"degree_centrality": (d)=>getColor(d,"interpolatePlasma"),
		"eigenvector_centrality": (d)=>getColor(d,"interpolateViridis"),
		"betweenness_centrality": (d)=>getColor(d,"interpolateCool"),
		"closeness_centrality": (d)=>getColor(d,"interpolateCividis"),
		"shortest_path":(d)=>shortest_path_nodes.includes(d.character)?
							d3.schemeCategory10[1]:d3.schemeCategory10[9],
		"spanning_tree":d3.schemeAccent[4],
	}

	function getColor(d,scheme){
		return d3.scaleSequential(d3[scheme])(d[category]/highest[category])
	}

	return colorScheme[category]

}

const linkColor=(category,edges)=>{
	if(category=="shortest_path"){
		return d=>{
			let result = "#999"
			for(let i =0;i<edges.length;i++){
				if((edges[i][0]==d.source.character&&edges[i][1]==d.target.character)||
					(edges[i][1]==d.source.character&&edges[i][0]==d.target.character)){
					result = "red"
					break
				}
			}
			return result
		}
	}else{
		return "#999"
	}
}

function handleWidth(width){
		if(width> 600){
			return width-300 < 800? width-300:800
		}else{
			return width
		}
	}

function legend(selection,highest,category){
	const centrality = category.match(/centrality/i)!==null
	const legendWidth = 100;
	const max = centrality?highest[category]:1
	const legendData = d3.range(100).map(x=>x*max)
	const xPos = 10
	const yPos = 10
	const colorSchemes ={
		"degree_centrality": "interpolatePlasma",
		"eigenvector_centrality": "interpolateViridis",
		"betweenness_centrality": "interpolateCool",
		"closeness_centrality": "interpolateCividis",
	}

	// Color bar
	selection
		.selectAll("rect")
		.data(legendData)
	    .enter()
	    .append("rect")
	   	.attr("class","thebar")
		.attr("opacity",centrality?1:0)
	    .attr("fill",(d)=>centrality?getColor((d/max)/100,colorSchemes[category]):"white")
	    .attr("width",1)
	    .attr("height",10)
	    .attr("x",d=>d/max+xPos)
	    .attr("y",yPos)

	function getColor(d,scheme){
		return d3.scaleSequential(d3[scheme])(d)
	}

	// Axis
	const scale = d3.scaleLinear().domain([0,highest[category]]).range([0, 100])
	const xaxis = d3.axisBottom(scale).ticks(2,".2f").tickValues([0,max/2,max])
	selection
		.append("g")
		.attr("class","thebar")
		.attr("opacity",centrality?1:0)
		.attr("transform", `translate( ${xPos},${yPos + 10})`) 
		.call(centrality?xaxis:()=>{})

}

function Chart(props){
	const width = handleWidth(props.chartSize.width);
	const height = props.chartSize.height;
	const ref = useRef()
	const [init,setInit] = useState(0);
	const [prevSize, setPrevSize] = useState({"width":width,"height":height})
	useEffect(() => {
		if(init < 1 || props.category == "spanning_tree" || width -prevSize.width !== 0 || height -prevSize.height !== 0){
			const edges = props.category == "spanning_tree"?props.spanning_tree:props.edges

			const svg = d3.select(ref.current)
		    			  .attr("viewBox", [0, 0, width, height])

		    d3.selectAll("g").remove()
      		d3.selectAll(".thebar").remove()

		    const layer1 = svg.append('g');
			const layer2 = svg.append('g');
			const layer3 = svg.append('g');
			const layer4 = svg.append("g").attr("class","legendBar");

			const rect = layer1
							.append("rect")
		    				.attr("x1", 0)
			        		.attr("y1", 0)
			        		.attr("width", width)
	      					.attr("height", height)
		    				.attr("fill","white")
		    				.on("click",function(d,i){
		    					d3.select(this).text(d=> props.onFocusChange(""))})



			const links = edges.map(d => Object.create({"source": d[0],"target":d[1],"value":1}))
	  		const nodes = props.nodes.map(d => Object.create(d));

		    const simulation = d3.forceSimulation(nodes)
	              .force("center", d3.forceCenter(width/2, height/2))  
	              .force("charge", d3.forceManyBody())
	              .force("link", d3.forceLink(links).id(d => d.character))
	              .force("radial",props.category=="spanning_tree"?d3.forceRadial(width/2):null)
	              .force("collition",d3.forceCollide(1))

	        const link = layer2
		      .attr("stroke-opacity", 0.6)
		      .selectAll("line")
		      .data(links)
		      .join("line")
		      .attr("stroke", linkColor(props.category,props.shortest_path_edges))
		      .attr("stroke-width", d => Math.sqrt(d.value));

		    const node = layer3
		      .attr("stroke", "#fff")
		      .attr("stroke-width", 1.5)
		      .selectAll("circle")
		      .data(nodes)
		      .join("circle")
		      .attr("r", 7)
		      .attr("fill", nodeColor(props.category,props.highest,props.shortest_path_nodes))
		      .call(drag(simulation))
		      .on("click",function(d,i){ 
		      	d3.select(this)
		      	  .text(d=> props.onFocusChange(d.character))
		      	})

	      	simulation.on("tick", () => {
			    link.attr("x1", d => d.source.x)
			        .attr("y1", d => d.source.y)
			        .attr("x2", d => d.target.x)
			        .attr("y2", d => d.target.y);
			    node.attr("cx", d => d.x)
			        .attr("cy", d => d.y);
			  });

	      	props.category=="spanning_tree"?setInit(0):setInit(1)
			setPrevSize({"width":width,"height":height})	      	
		    
		    d3.select(".legendBar")
      		  .call(legend,props.highest,props.category)

      	}else if(init > 0 ){
      		d3.selectAll(".thebar").remove()
      		
      		d3.selectAll("circle")
      		  .attr("fill", nodeColor(props.category,props.highest,props.shortest_path_nodes))
      		d3.selectAll("line")
      		  .attr("stroke", linkColor(props.category,props.shortest_path_edges))
		    
      		d3.select(".legendBar")
      		  .call(legend,props.highest,props.category)
      	}
  	}, [props.category,props.chartSize])
	
	useEffect(()=>{
		d3.selectAll("circle")
		  .attr("stroke",(d)=>d.character==props.focus?"black":"white")
		  .attr("stroke-width",(d)=>d.character==props.focus?4:1.5)
	},[props.focus])

	return(
			<div className="chart" style={{width:width,height:height}}>
				<svg 
		      		ref={ref}
		      	/>
	      	</div>
	      	)
}

export default Chart;