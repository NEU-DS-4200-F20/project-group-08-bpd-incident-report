
function pie_chart(){
<<<<<<< HEAD
  
=======
  console.log('hi')
  // set the dimensions and margins of the graph
  var width = 450
      height = 450
      margin = 40
>>>>>>> d2259d7583a32ece81a6f4b749c30159cb853eac

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

<<<<<<< HEAD
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
=======
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
>>>>>>> d2259d7583a32ece81a6f4b749c30159cb853eac
  
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
    selectableElements.classed('selected', d2 =>
      selectedData.includes(d2)
    );
  };    
  return chart;
  
}
