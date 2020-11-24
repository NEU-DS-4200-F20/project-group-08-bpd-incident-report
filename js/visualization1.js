// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

  // Load the data from a json file (you can make these using
  // JSON.stringify(YOUR_OBJECT), just remove the surrounding '')
  d3.csv("./data/complaints_officers.csv", function(d) {
  	return {
<<<<<<< HEAD
  	  incident_type : d.incident_type,
      officer_ia_sustained_allegations : +d.officer_ia_sustained_allegations,
      ia_number : d.ia_number
=======
      //officer_ia_score : +d.officer_ia_score
>>>>>>> d2259d7583a32ece81a6f4b749c30159cb853eac
  	};
	}).then(data => {


    // General event type for selections, used by d3-dispatch
    // https://github.com/d3/d3-dispatch
    const dispatchString = 'selectionUpdated';

    // Create a scatterplot given x and y attributes, labels, offsets; 
    // a dispatcher (d3-dispatch) for selection events; 
    // a div id selector to put our svg in; and the data to use.
    let pie1 = pie_chart2()
      .x(d => d3.count(d.incident_type))
      .y(d => d.incident_type)
      .selectionDispatcher(d3.dispatch(dispatchString))
      ('#vis1pie', data);


<<<<<<< HEAD
=======
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
>>>>>>> d2259d7583a32ece81a6f4b749c30159cb853eac
  });
})());

