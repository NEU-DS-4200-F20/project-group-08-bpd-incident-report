/* global D3 */

// Initialize a scatterplot. Modeled after Mike Bostock's
// Reusable Chart framework https://bost.ocks.org/mike/chart/
function scatterplot2() {

  
  // Based on Mike Bostock's margin convention
  // https://bl.ocks.org/mbostock/3019563

 

  let margin = {
      top: 60,
      left: 70,
      right: 55,
      bottom: 40
    },
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom,
    xValue = d => d[0],
    yValue = d => d[1],
    xLabelText = '',
    yLabelText = '',
    headerLabelText = '',
    yLabelOffsetPx = 0,
    xScale = d3.scaleLinear(),
    yScale = d3.scaleLinear(),
    ourBrush = null,
    selectableElements = d3.select(null),
    dispatcher;

  // Create the chart by adding an svg to the div with the id 
  // specified by the selector using the given data
  function chart(selector, data) {



    let svg = d3.select(selector)
      .append('svg')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))
        .classed('svg-content', true);

    svg = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    let header = svg.append('g')
      .append('text')
        .attr('class', 'axisLabel')
        .attr('transform', 'translate(' + margin.left/3 + ', -20)')
        .attr("id", "vis3spHeader")
        .style("font-weight", "bold")
        .attr("font-size","10px")
        .text(headerLabelText);

   var color = d3.scaleOrdinal(d3.schemeCategory10);
    //Define scales
    xScale
      .domain([
        d3.min(data, d => xValue(d)),
        d3.max(data, d => xValue(d))
      ])
      .rangeRound([0, width]);

    yScale
      .domain([
        d3.min(data, d => yValue(d)),
        d3.max(data, d => yValue(d))
      ])
      .rangeRound([height, 0]);

    let xAxis = svg.append('g')
        .attr('transform', 'translate(0,' + (height) + ')')
        .call(d3.axisBottom(xScale));
        
    // X axis label
    xAxis.append('text')        
        .attr('class', 'axisLabel')
        .attr('transform', 'translate(' + [(width/2)] + ', 30)')
        .attr("id", "vis3spXAxis")
        .style("font-weight", "bold")
        .text(xLabelText);
      
    let yAxis = svg.append('g')
        .call(d3.axisLeft(yScale))
      .append('text')
        .attr('class', 'axisLabel')
        .attr('transform', 'translate(-60 ,'+ [(height/2)-margin.top] +') rotate(270)')
        .style("font-weight", "bold")
        .attr("id", "vis3spYAxis")
        .text(yLabelText);


    // Add the points
    let points = svg.append('g')
      .selectAll('.scatterPoint')
        .data(data);

    points.exit().remove();

    points = points.enter()
      .append('circle')
        .attr('class', function(d,i){ 
           if (d.rank == "capt"){
              return "point scatterPoint2 capt";
          }else if (d.rank == "depsup"){
              return "point scatterPoint2 depsup";
          }else if (d.rank == "det"){
              return "point scatterPoint2 det";
          }else if (d.rank == "lieut"){
              return "point scatterPoint2 lieut";
          }else if (d.rank == "ltdet"){
              return "point scatterPoint2 ltdet";
          }else if (d.rank == "ptl"){
              return "point scatterPoint2 ptl";
          }else if (d.rank == "sergt"){
              return "point scatterPoint2 sergt";
          }else if (d.rank == "sgtdet"){
              return "point scatterPoint2 sgtdet";
          }else if (d.rank == "supt"){
              return "point scatterPoint2 supt";
          } else if (d.rank == "comiss"){
              return "point scatterPoint2 comiss";
          } 
        })
      .style('stroke', function(d){ return color(d.rank); })

      .merge(points)
        .attr('cx', X)
        .attr('cy', Y)
        .attr('r', 5);


   
    
    selectableElements = points;

    
    svg.call(brush);

    // Highlight points when brushed
    function brush(g) {
      const brush = d3.brush() // Create a 2D interactive brush
        .on('start brush', highlight) // When the brush starts/continues do...
        .on('end', brushEnd) // When the brush ends do...
        .extent([
          [-margin.left, -margin.bottom],
          [width + margin.right, height + margin.top]
        ]);
        
      ourBrush = brush;

      g.call(brush); // Adds the brush to this element

      // Highlight the selected circles
      function highlight(event, d) {
        if (event.selection === null) return;
        const [
          [x0, y0],
          [x1, y1]
        ] = event.selection;

        // If within the bounds of the brush, select it
        points.classed('selected', d =>
          x0 <= X(d) && X(d) <= x1 && y0 <= Y(d) && Y(d) <= y1
        );

        // Get the name of our dispatcher's event
        let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];

        // Let other charts know about our selection
        dispatcher.call(dispatchString, this, svg.selectAll('.selected').data());
      }
      
      function brushEnd(event, d){
        // We don't want infinite recursion
        if(event.sourceEvent !== undefined && event.sourceEvent.type!='end'){
          d3.select(this).call(brush.move, null);
        }
      }
    }



    var legend = svg.selectAll('legend')
      .data(color.domain())
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', function(d,i){ return 'translate(0,' + i * 20 + ')'; });

    // give x value equal to the legend elements. 
    // no need to define a function for fill, this is automatically fill by color.
    legend.append('rect')
      .attr('class', function(d,i){ 
           if (d == "capt"){
              return "legend capt";
          }else if (d == "depsup"){
              return "legend depsup";
          }else if (d == "det"){
              return "legend det";
          }else if (d == "lieut"){
              return "legend lieut";
          }else if (d == "ltdet"){
              return "legend ltdet";
          }else if (d == "ptl"){
              return "legend ptl";
          }else if (d == "sergt"){
              return "legend sergt";
          }else if (d == "sgtdet"){
              return "legend sgtdet";
          }else if (d == "supt"){
              return "legend supt";
          } else if (d == "comiss"){
              return "legend comiss";
          }
        })
      .attr('x', width)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color)
      .attr('opacity', .6);
  
    // add text to the legend elements.
    // rects are defined at x value equal to width, we define text at width - 6, this will print name of the legends before the rects.
    legend.append('text')
      .attr('x', width - 6)
      .attr('y', 9)
      .attr('dy', '.35em')
      .attr('class', 'legend-text')
      .style('text-anchor', 'end')
      .text(function(d){ return d; });

      legend
        .on("mousedown", function(e) {
          // is the element currently visible ?
          currentOpacity = d3.selectAll("circle.point.scatterPoint2." + e.target.__data__).style("opacity")
          // Change the opacity: from 0 to 1 or from 1 to 0
          d3.selectAll("circle.point.scatterPoint2." + e.target.__data__).transition().style("opacity", currentOpacity == .6 ? 0:.6)

          d3.selectAll("rect.legend." + e.target.__data__).transition().style("opacity", currentOpacity == .6 ? .1:.6)
      });



    var formatDecimalComma = d3.format(",.2f");


    var tooltip = d3.select(selector)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")


    let points2 = svg.append('g')
      .selectAll('.scatterPoint')
        .data(data)

    points2 = points2.enter()
      .append('circle')
      .attr('class', 'fake circle')
      .style('opacity', 0)
      .merge(points)
        .attr('cx', X)
        .attr('cy', Y)
        .attr('r', 5)
      .on("mouseover", function(d) {
    tooltip
      .style("opacity", .6)
  } )
    .on("mousemove", function(e) {
    tooltip
      .html("Rank:<b> " + e.target.__data__.rank + "</b>  |  Years on the Force:<b> " + e.target.__data__.yof 
        + "</b><br># of Sustained Allegations:<b> " + e.target.__data__.ia_sustained_allegations + "</b>"
        + "</b><br>Salary in 2019:<b> $" + formatDecimalComma(e.target.__data__.total));
  } )
    .on("mouseleave", function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  } );



    

    

    return chart;
  }

  // The x-accessor from the datum
  function X(d) {
    return xScale(xValue(d));
  }

  // The y-accessor from the datum
  function Y(d) {
    return yScale(yValue(d));
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

  chart.x = function (_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function (_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  chart.headerLabel = function (_) {
    if (!arguments.length) return headerLabelText;
    headerLabelText = _;
    return chart;
  };

  chart.xLabel = function (_) {
    if (!arguments.length) return xLabelText;
    xLabelText = _;
    return chart;
  };

  chart.yLabel = function (_) {
    if (!arguments.length) return yLabelText;
    yLabelText = _;
    return chart;
  };

  chart.yLabelOffset = function (_) {
    if (!arguments.length) return yLabelOffsetPx;
    yLabelOffsetPx = _;
    return chart;
  };
  
  // Gets or sets the dispatcher we use for selection events
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

