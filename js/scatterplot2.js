/* global D3 */

// Initialize a scatterplot. Modeled after Mike Bostock's
// Reusable Chart framework https://bost.ocks.org/mike/chart/
function scatterplot2() {

  
  // Based on Mike Bostock's margin convention
  // https://bl.ocks.org/mbostock/3019563

 

  let margin = {
      top: 60,
      left: 50,
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
        .attr('transform', 'translate(' + (margin.left/3) + ', -30)')
        .attr("id", "vis3spHeader")
        .style("font-weight", "bold")
        .attr("font-size","12px")
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
        .call(d3.axisBottom(xScale).ticks(6));
        
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
        .attr('transform', 'translate(-40 ,'+ [(height/2)-(margin.top + 20)] +') rotate(270)')
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


    if (selector === "#vis3sp2") {

          var legbor = svg.append('rect')
            .attr("x", width - 88)
            .attr("y", -2)
            .attr("width", 88+margin.left + 3)
            .attr("height", 202)
            .attr('stroke', 'black');


            var legend2 = svg.selectAll('legend2')
            .data(color.domain())
            .enter().append('g')
            .attr('class', 'legend2')
            .attr('transform', function(d,i){ return 'translate(0,' + i * 20 + ')'; })
           



          // give x value equal to the legend elements. 
          // no need to define a function for fill, this is automatically fill by color.
          legend2.append('circle')
            .attr('class', function(d,i){ 
                 if (d == "capt"){
                    return "legend2 capt";
                }else if (d == "depsup"){
                    return "legend2 depsup";
                }else if (d == "det"){
                    return "legend2 det";
                }else if (d == "lieut"){
                    return "legend2 lieut";
                }else if (d == "ltdet"){
                    return "legend2 ltdet";
                }else if (d == "ptl"){
                    return "legend2 ptl";
                }else if (d == "sergt"){
                    return "legend2 sergt";
                }else if (d == "sgtdet"){
                    return "legend2 sgtdet";
                }else if (d == "supt"){
                    return "legend2 supt";
                } else if (d == "comiss"){
                    return "legend2 comiss";
                }
              })

            .attr('cx', width + margin.right - 15)
            .attr('cy', 9)
            .attr('r', 9)
            .style('fill', color)
            .attr('opacity', .6);
        
          legend2.append('text')
            .attr('x', width + margin.right - 27)
            .attr('y', 9)
            .attr('dy', '.35em')
            .attr('class', 'legend2-text')
            .style('text-anchor', 'end')
            .text(function(d){  if (d == "capt"){
                    return "Captain";
                }else if (d == "depsup"){
                    return "Dep. Superintendent";
                }else if (d == "det"){
                    return "Detective";
                }else if (d == "lieut"){
                    return "Lieutenant";
                }else if (d == "ltdet"){
                    return "Lieutenant Dep.";
                }else if (d == "ptl"){
                    return "Patrol";
                }else if (d == "sergt"){
                    return "Sergeant";
                }else if (d == "sgtdet"){
                    return "Sergeant Dep.";
                }else if (d == "supt"){
                    return "Superintendent";
                } else if (d == "comiss"){
                    return "Commissioner";
                }});

            legend2
              .on("mousedown", function(e) {
                // is the element currently visible ?
                currentOpacity = d3.selectAll("circle.point.scatterPoint2." + e.target.__data__).style("opacity")
                // Change the opacity: from 0 to 1 or from 1 to 0
                d3.selectAll("circle.point.scatterPoint2." + e.target.__data__).transition().style("opacity", currentOpacity == .6 ? 0:.6)

                d3.selectAll("circle.legend2." + e.target.__data__).transition().style("opacity", currentOpacity == .6 ? .1:.6)
            });
    }
    



    var formatDecimalComma = d3.format(",.2f");


    var tooltip = d3.select(selector)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .attr('id', 'sptt')


   tooltip.append('div') // add divs to the tooltip defined above                            
    .attr('class', 'rank'); // add class 'label' on the selection                         

  tooltip.append('div') // add divs to the tooltip defined above                     
    .attr('class', 'yof'); // add class 'count' on the selection                  

  tooltip.append('div') // add divs to the tooltip defined above  
    .attr('class', 'ia_sustained_allegations'); // add class 'percent' on the selection

  tooltip.append('div') // add divs to the tooltip defined above  
    .attr('class', 'total'); // add class 'percent' on the selection



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
         var nd = d.target.__data__;               
         tooltip.select('.rank').html(function(nd){ 
            var rd = d.target.__data__.rank;  
               if (rd == "capt"){
                    return "Rank: <b>Captain</b>";
                }else if (rd == "depsup"){
                    return "Rank: <b>Dep. Superintendent</b>";
                }else if (rd == "det"){
                    return "Rank: <b>Detective</b>";
                }else if (rd == "lieut"){
                    return "Rank: <b>Lieutenant</b>";
                }else if (rd == "ltdet"){
                    return "Rank: <b>Lieutenant Dep.</b>";
                }else if (rd == "ptl"){
                    return "Rank: <b>Patrol</b>";
                }else if (rd == "sergt"){
                    return "Rank: <b>Sergeant</b>";
                }else if (rd == "sgtdet"){
                    return "Rank: <b>Sergeant Dep.</b>";
                }else if (rd == "supt"){
                    return "Rank: <b>Superintendent</b>";
                } else if (rd == "comiss"){
                    return "Rank: <b>Commissioner</b>";
                }});       
         tooltip.select('.yof').html('Years on the Force: <b>' + nd.yof+ '</b>');            
         tooltip.select('.ia_sustained_allegations').html('Sustained Allegations: <b>' + nd.ia_sustained_allegations + '</b>');    
         tooltip.select('.total').html('Salary in 2019 (USD): <b>$' + formatDecimalComma(nd.total) + '</b>');     
         tooltip.style('display', 'block');
         tooltip.style('opacity',2);
  } )
    .on("mousemove", function(e) {
    tooltip
      .style('top', (e.pageY + 25) + 'px')
      .style('left', (e.pageX - 15) + 'px');   
  } )
    .on("mouseout", function(d) {
    tooltip
      tooltip.style('display', 'none');
      tooltip.style('opacity',0);
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

