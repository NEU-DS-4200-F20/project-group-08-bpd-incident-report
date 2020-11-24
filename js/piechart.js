
function pie_chart(){
  console.log('hi')
  // set the dimensions and margins of the graph
  var width = 450
      height = 450
      margin = 40

  function chart(selector, data) {

    let svg = d3.select(selector)
      .append('svg')
        .attr('width', width)
        .attr('height', height)
  
      svg = svg.append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    // setting a variable as radius
    var radius = Math.min(width, height) / 2 - margin

    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', 'blue', 'red'])

    // Compute the position of each group on the pie:
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
    let color_func = function(d3){
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
      .attr("d", arc);
    
      /*
    svg = svg.append('g')
        .selectAll('.piesection')
        .data(data)
        .enter()
        .append('path')
        .attr('d4', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr('fill', color_func)
        .attr('stroke', 'red')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        */
  
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
