/* global D3 */

// Initialize a table. Modeled after Mike Bostock's
// Reusable Chart framework https://bost.ocks.org/mike/chart/
function table() {
   var md = false;
  // Based on Mike Bostock's margin convention
  // https://bl.ocks.org/mbostock/3019563
  let margin = {
      top: 60,
      left: 50,
      right: 30,
      bottom: 35
    },
    width = 100 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
   
    c1LabelText = '',
    c2LabelText = '',
    c3LabelText = '',
    c4LabelText = '',
    selectableElements = d3.select(null),
    dispatcher;


  // Create the chart by adding an svg to the div with the id 
  // specified by the selector using the given data
  function chart(selector, data) {

    var columns = [c1LabelText, c2LabelText, c3LabelText,c4LabelText]
    

      var table = d3.select(selector)
      var thead = table.append('thead')
      var tbody = table.append('tbody');

      // append the header row
      thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
          .text(function (column) { return column; });

      // create a row for each object in the data
      var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')

        

      // create a cell in each row for each column
      var cells = rows.selectAll('td')
        .data(function (row) {
          return columns.map(function (column) {
            return {column: column, value: row[column]};
          });
        })
        .enter()
        .append('td')
          .text(function (d) { return d.value; });

      d3.select('tbody').selectAll('tr')

        .on("mouseover", function(d){
          if(md) {
            this.classList.add("selected");
            this.classList.add("mouseover");
          }
          else {
            this.classList.add("mouseover");
          }
        })


        .on("mouseout", function(d){
          
          this.classList.remove("mouseover");
    
        })

        .on("mousedown", function(d){
          if(this.classList.contains('selected')) {
            this.classList.add("selected");
          }
          md = true;
          
    
        })

        .on("mouseup", function(d){
          
          md = false; 
       
    
        })


        .on("click", function(d){
          if(this.classList.contains('selected')){
            this.classList.remove("selected");
          } else {
            this.classList.add("selected");
          }


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


  chart.c1Label = function (_) {
    if (!arguments.length) return c1LabelText;
    c1LabelText = _;
    return chart;
  };

  chart.c2Label = function (_) {
    if (!arguments.length) return c2LabelText;
    c2LabelText = _;
    return chart;
  };

  chart.c3Label = function (_) {
    if (!arguments.length) return c3LabelText;
    c3LabelText = _;
    return chart;
  };

  chart.c4Label = function (_) {
    if (!arguments.length) return c4LabelText;
    c4LabelText = _;
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

    var years = [];

    for (var i = selectedData.length - 1; i >= 0; i--) {
      years.push(selectedData[i].year)
    }

    var vals = [];
    var rows = document.getElementsByTagName('td');
    for (var i = 0; i < rows.length; i++) {
      var rowText = rows[i].textContent;
 
        vals.push(rowText);
      
    }

    console.log(years.toString());
    console.log(vals.toString());
    
  };



  return chart;
}

















