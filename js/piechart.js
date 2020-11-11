
function pie_chart(){
  
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
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56'])

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })

    // building pie
    svg.append('g')
      .selectAll('whatever')
      .data(data)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr('stroke', 'red')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)
  
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
    selectableElements.classed('selected', d =>
      selectedData.includes(d)
    );
  
  };    
  return chart;
}
