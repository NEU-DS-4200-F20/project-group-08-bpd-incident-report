// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

  // Load the data from a json file (you can make these using
  // JSON.stringify(YOUR_OBJECT), just remove the surrounding '')
  d3.csv("./data/complaints_officers.csv", function(d) {
  	return {
      //officer_ia_score : +d.officer_ia_score
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

    var svg = d3.select("#vis1pie")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// set the color scale
    var color = d3.scaleOrdinal(d3.schemeCategory10)

// Compute the position of each group on the pie:
    var pie = d3.pie()
      //.value(function(d) {return d.value; })


    svg.selectAll('svg')
      .data(data)
      .enter()
      .append('path')
      .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
      //.attr('fill', function(d){ return(color(d.data)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
  });
})());
