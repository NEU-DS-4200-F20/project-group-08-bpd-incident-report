
function pie_chart(){
  

  let margin = {
      top: 60,
      left: 70,
      right: 30,
      bottom: 40
    },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    radius = width/2,

  vValue = d => d[0],
  cValue = d => d[1],
  ourBrush = null,
  selectableElements = d3.select(null);
  
  function chart(selector, data) {

    let svg = d3.select(selector)
      .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed('svg-content', true);

    svg = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


     var pie = d3.pie()
        .value(function(d) {return vValue; })


  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll('whatever')
    .data(data)
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(cValue)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
  
    return chart;
  
  };

  chart.v = function (_) {
    if (!arguments.length) return vValue;
    vValue = _;
    return chart;
  };

  chart.c = function (_) {
    if (!arguments.length) return cValue;
    cValue = _;
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
