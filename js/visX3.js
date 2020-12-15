// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

  // reads data into the file
  d3.csv("./data/pie_ii_act.csv", function(d) {
  	return {
   		action : d.action,
    	count : +d.count,
  	};
	}).then(data => {

     // sets margins and other information for the charts. 
     let margin = {
      top: 150,
      left: 150,
      right: 50,
      bottom: 0
    },
  width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    selectableElements = d3.select(null),
    dispatcher;


    // sets radius for the chart
     var radius = Math.min(width , height) / 2;


    var legendRectSize = 12.5; 
    var legendSpacing = 6; 

    // setting color scheme
    var color = d3.scaleOrdinal(d3.schemeSet3);

    // appends the pie chart to the appropriate vis holder
    let svg = d3.select('#vis2Xpc')
      .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox',[0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed('svg-content', true);

    svg = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  
   var arc = d3.arc()
      .innerRadius(0) 
      .outerRadius(radius); 

// gets the count for all the values being shown
 var pie = d3.pie() 
  .value(function(d) { return d.count; }) 
  .sort(null);


  // define tooltip
  var tooltip = d3.select('#vis2Xpc') 
    .append('div')              
    .attr('class', 'tooltip')
    .attr('id', 'pctt');

  tooltip.append('div')                   
    .attr('class', 'action');               

  tooltip.append('div')                 
    .attr('class', 'count');      

  tooltip.append('div') 
    .attr('class', 'percent'); 

  //gets the count for each value and sets enabled to true
  data.forEach(function(d) {
  d.count = +d.count; 
  d.enabled = true; 
});


  var path = svg.selectAll('path') 
  .data(pie(data)) 
  .enter() 
  .append('path') 
  .attr('d', arc) 
  .attr('fill', function(d) { return color(d.data.action); }) 
  .each(function(d) { this._current - d; })
  .style("opacity", .8);

// shows the tool tip and correct values when a value is hovered over
path.on('mouseover', function(d) {  
 var total = d3.sum(data.map(function(d) {  
  return (d.enabled) ? d.count : 0;                            
  }));                      
 var nd = d.target.__data__.data;                    
 var percent = Math.round(1000 * nd.count / total) / 10; 
 tooltip.select('.action').html(nd.action);         
 tooltip.select('.count').html(nd.count); 
 tooltip.select('.percent').html(percent + '%'); 
 tooltip.style('display', 'block');
 tooltip.style('opacity',2);
});                                                           

// sets the tool tip back to hidden
path.on('mouseout', function() {                 
  tooltip.style('display', 'none');
      tooltip.style('opacity',0);
 });

// makes the tool tip follow the mouse
path.on('mousemove', function(d) { 
  tooltip
    .style('top', (d.pageY + 10) + 'px')
    .style('left', (d.pageX - 25) + 'px');            
 
  });

// define legend
var legend = svg.selectAll('.legend')
  .data(color.domain())
  .enter() 
  .append('g') 
  .attr('class', 'legend')
  .attr('transform', function(d, i) {                   
    var height = legendRectSize + legendSpacing;      
    var offset =  height * color.domain().length / 2; 
    var horz = radius * 1.2; 
    var vert = i * height - offset;              
      return 'translate(' + horz + ',' + vert + ')'; 
   });

// adding colored squares to legend
legend.append('rect')                     
  .attr('width', legendRectSize)            
  .attr('height', legendRectSize)            
  .style('fill', color) 
  .style('stroke', color)
  .style("opacity", .8)
  .on('click', function(e) {
   var action = e.target.__data__;
    var rect = d3.select(this);
    var enabled = true; 
    var totalEnabled = d3.sum(data.map(function(d) { 
      return (d.enabled) ? 1 : 0; 
    }));

    
    if (rect.attr('class') === 'disabled') {
      rect.attr('class', ''); 
    } else { 
      if (totalEnabled < 2) return; 
      rect.attr('class', 'disabled');
      enabled = false; 
      
    }

    pie.value(function(d) { 
      if (d.action === action) d.enabled = enabled;  
        return (d.enabled) ? d.count : 0;  
    });

    path = path.data(pie(data));  

    path.transition() 
      .duration(750) 
      .attrTween('d', function(d) {
        var interpolate = d3.interpolate(this._current, d); 
        this._current = interpolate(0); 
        return function(t) {
          return arc(interpolate(t));
        };
      });
  });

// adding text to legend
legend.append('text')                                    
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - (legendSpacing/2))
  .text(function(d) { return d; }); 
  });

})());