/* global D3 */

// Initialize a line chart. Modeled after Mike Bostock's
// Reusable Chart framework https://bost.ocks.org/mike/chart/
function pc() {

  
  let margin = {
      top: 60,
      left: 70,
      right: 55,
      bottom: 40
    },
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom,
    headerLabelText = '',
    selectableElements = d3.select(null),
    dispatcher;

  // Create the chart by adding an svg to the div with the id 
  // specified by the selector using the given data
  function chart(selector, data) {


    var radius = Math.min(width, height) / 2;


    var legendRectSize = 25; 
    var legendSpacing = 6; 

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    let svg = d3.select(selector)
      .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', [-500, -500, 1000, 1000].join(' '))
        .classed('svg-content', true);

    svg = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  
   var arc = d3.arc()
      .innerRadius(0) // none for pie chart
      .outerRadius(radius); // size of overall chart

    var pie = d3.pie() // start and end angles of the segments
      .value(function(d) { return d3.count(data, d => d.finding);}) // how to extract the numerical data from each entry in our dataset
      .sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null


      var tooltip = d3.select('#chart') // select element in the DOM with id 'chart'
        .append('div') // append a div element to the element we've selected                                    
        .attr('class', 'tooltip2'); // add class 'tooltip' on the divs we just selected

      tooltip.append('div') // add divs to the tooltip defined above                            
        .attr('class', 'label'); // add class 'label' on the selection                         

      tooltip.append('div') // add divs to the tooltip defined above                     
        .attr('class', 'count'); // add class 'count' on the selection                  

      tooltip.append('div') // add divs to the tooltip defined above  
        .attr('class', 'percent'); // add class 'percent' on the selection


      data.forEach(function(d) {
        d.count = d3.count(data, d => d.finding)
        d.enabled = true; // add enabled property to track which entries are checked
      });

    return chart;
  }


  chart.margin = function (_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function (_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function (_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  // Gets or sets the dispatcher we use for selection events
  chart.selectionDispatcher = function (_) {
    if (!arguments.length) return dispatcher;
    dispatcher = _;
    return chart;
  };

    chart.headerLabel = function (_) {
    if (!arguments.length) return headerLabelText;
    headerLabelText = _;
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