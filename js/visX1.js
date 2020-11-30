// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

  d3.csv("./data/pie_ii_find.csv", function(d) {
  	return {
   		finding : d.finding,
    	count : +d.count,
  	};
	}).then(data => {

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



     var radius = Math.min(width , height) / 2;


    var legendRectSize = 12.5; 
    var legendSpacing = 6; 

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    let svg = d3.select('#visXpc')
      .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox',[0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed('svg-content', true);

    svg = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  
   var arc = d3.arc()
      .innerRadius(0) // none for pie chart
      .outerRadius(radius); // size of overall chart

 var pie = d3.pie() // start and end angles of the segments
  .value(function(d) { return d.count; }) // how to extract the numerical data from each entry in our dataset
  .sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null

  // define tooltip
  var tooltip = d3.select('#visXpc') // select element in the DOM with id 'chart'
    .append('div') // append a div element to the element we've selected                                    
    .attr('class', 'tooltip2'); // add class 'tooltip' on the divs we just selected

  tooltip.append('div') // add divs to the tooltip defined above                            
    .attr('class', 'finding'); // add class 'label' on the selection                         

  tooltip.append('div') // add divs to the tooltip defined above                     
    .attr('class', 'count'); // add class 'count' on the selection                  

  tooltip.append('div') // add divs to the tooltip defined above  
    .attr('class', 'percent'); // add class 'percent' on the selection


  data.forEach(function(d) {
  d.count = +d.count; // calculate count as we iterate through the data
  d.enabled = true; // add enabled property to track which entries are checked
});


  var path = svg.selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
  .data(pie(data)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
  .enter() //creates placeholder nodes for each of the values
  .append('path') // replace placeholders with path elements
  .attr('d', arc) // define d attribute with arc function above
  .attr('fill', function(d) { return color(d.data.finding); }) // use color scale to define fill of each label in dataset
  .each(function(d) { this._current - d; }); // creates a smooth animation for each track

// mouse event handlers are attached to path so they need to come after its definition
path.on('mouseover', function(d) {  // when mouse enters div      
 var total = d3.sum(data.map(function(d) { // calculate the total number of tickets in the dataset         
  return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase                                      
  }));                      
 var nd = d.target.__data__.data;                    
 var percent = Math.round(1000 * nd.count / total) / 10; // calculate percent
 tooltip.select('.finding').html(nd.finding); // set current label           
 tooltip.select('.count').html(nd.count); // set current count            
 tooltip.select('.percent').html(percent + '%'); // set percent calculated above          
 tooltip.style("display", "block");   
 tooltip.style('opacity',.8);
});                                                           

path.on('mouseout', function() { // when mouse leaves div                        
  tooltip.style('display', 'none');
      tooltip.style('opacity',0);// hide tooltip for that element
 });

path.on('mousemove', function(d) { // when mouse moves                
  tooltip.style('top', (d.layerY + 50) + 'px') // always 10px below the cursor
    .style('left', (d.layerX + 20) + 'px'); // always 10px to the right of the mouse
  });

// define legend
var legend = svg.selectAll('.legend') // selecting elements with class 'legend'
  .data(color.domain()) // refers to an array of labels from our dataset
  .enter() // creates placeholder
  .append('g') // replace placeholders with g elements
  .attr('class', 'legend') // each g is given a legend class
  .attr('transform', function(d, i) {                   
    var height = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacing      
    var offset =  height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
    var horz = radius * 1.2; // the legend is shifted to the left to make room for the text
    var vert = i * height - offset; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
      return 'translate(' + horz + ',' + vert + ')'; //return translation       
   });

// adding colored squares to legend
legend.append('rect') // append rectangle squares to legend                                   
  .attr('width', legendRectSize) // width of rect size is defined above                        
  .attr('height', legendRectSize) // height of rect size is defined above                      
  .style('fill', color) // each fill is passed a color
  .style('stroke', color)
  .on('click', function(e) {
   var finding = e.target.__data__;
    var rect = d3.select(this);// this refers to the colored squared just clicked
    var enabled = true; // set enabled true to default
    var totalEnabled = d3.sum(data.map(function(d) { // can't disable all options
      return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
    }));


    if (rect.attr('class') === 'disabled') { // if class is disabled
      rect.attr('class', ''); // remove class disabled
    } else { // else
      if (totalEnabled < 2) return; // if less than two labels are flagged, exit
      rect.attr('class', 'disabled'); // otherwise flag the square disabled
      enabled = false; // set enabled to false
      
    }

    pie.value(function(d) { 
      if (d.finding === finding) d.enabled = enabled; // if entry label matches legend label
        return (d.enabled) ? d.count : 0; // update enabled property and return count or 0 based on the entry's status
    });

    path = path.data(pie(data)); // update pie with new data

    path.transition() // transition of redrawn pie
      .duration(750) // 
      .attrTween('d', function(d) { // 'd' specifies the d attribute that we'll be animating
        var interpolate = d3.interpolate(this._current, d); // this = current path element
        this._current = interpolate(0); // interpolate between current value and the new value of 'd'
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

})())










;
