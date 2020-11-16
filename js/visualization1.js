// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

  // Load the data from a json file (you can make these using
  // JSON.stringify(YOUR_OBJECT), just remove the surrounding '')
  d3.csv("./data/officers.csv", function(d) {
  	return {
      ia_sustained_allegations : +d.ia_sustained_allegations
  	};
	}).then(data => {


    // General event type for selections, used by d3-dispatch
    // https://github.com/d3/d3-dispatch
    const dispatchString = 'selectionUpdated';


    var width = 450
      height = 450
      margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#vis1pie")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// set the color scale
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

// Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg.selectAll('svg')
      .data(data)
      .enter()
      .append('path')
      .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
      .attr('fill', function(d){ return(color(d.data)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
  });

})());
