
function pie_chart(){

  // set the dimensions and margins of the graph
  var width = 500
      height = 500
      margin = 30
  
  var radius = Math.min(width, height) / 2 - margin

  function chart(selector, data) {

    var svg = d3.select(selector)
      .append('svg')
        .attr('width', width)
        .attr('height', height)
    
    var data = data
  
    svg = svg.append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(['white', 'purple', 'orange', 'yellow', 'green', 'blue', 'red'])

    var pie = d3.pie();
    
    const color_map = {
      'Sustained': 'red',
      'Unfounded': 'blue',
      'Withdrawn': 'green',
      'Not Sustained': 'orange',
      'Pending': 'yellow',
      'Filed': 'purple',
      'Exonerated': 'white'
    };

    // building pie, defining colors to a chunk in the pie
    let color_function = function(d3){
        return (color_map[d3.finding]);
      }

    var arcs = svg.selectAll(".piesection")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")

    arcs.append("path")
      .attr("fill", function(d) {
          return color_map[d.finding];
      })
      .attr("d", d3.arc());
    
    svg
      .selectAll('whatever')
      .data(data)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
  
    return chart;
  
  };
  
  chart.selectionDispatcher = function (_) {
    if (!arguments.length) return dispatcher;
    dispatcher = _;
    return chart;
  };

  // Given selected data from another visualization 
  // select the relevant elements here (linking)
  chart.updateSelection = function (selectedData) {
    if (!arguments.length) return;

    // Select an element if its datum was selected
    selectableElements.classed('selected', d2 =>
      selectedData.includes(d2)
    );
  };    
  return chart;
  
}
