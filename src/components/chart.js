import React, {useEffect,useState,useRef} from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3"


function Chart(props){
	const svgStyle = {border: "2px solid gold",
	backgroundColor: "grey"}

	const width = 500
	const height = 500

	const ref = useRef()
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
	useEffect(() => {
	    const svg = d3.select(ref.current)
	    			      .attr("viewBox", [0, 0, width, height]);
		
		const links = props.edges.map(d => Object.create({"source": d[0],"target":d[1],"value":1}))
  		const nodes = props.nodes.map(d => Object.create(d));

	    const simulation = d3.forceSimulation(nodes)
              .force("center", d3.forceCenter(width/2, height/2))                  
              .force("charge", d3.forceManyBody())
              .force("link", d3.forceLink(links).id(d => d.character))

        const link = svg.append("g")
	      .attr("stroke", "#999")
	      .attr("stroke-opacity", 0.6)
	      .selectAll("line")
	      .data(links)
	      .join("line")
	      .attr("stroke-width", d => Math.sqrt(d.value));

	    const node = svg.append("g")
	      .attr("stroke", "#fff")
	      .attr("stroke-width", 1.5)
	      .selectAll("circle")
	      .data(nodes)
	      .join("circle")
	      .attr("r", 4)
	      .attr("fill", "black")
	      .call(drag(simulation));

      	simulation.on("tick", () => {
		    link
		        .attr("x1", d => d.source.x)
		        .attr("y1", d => d.source.y)
		        .attr("x2", d => d.target.x)
		        .attr("y2", d => d.target.y);

		    node
		        .attr("cx", d => d.x)
		        .attr("cy", d => d.y);
		  });
      	
  	}, [])
	return(
			<div className="chartbox">
				<svg 
		      		ref={ref}
		      		style={svgStyle}
		      	/>
	      	</div>
	      	)
}

export default Chart;