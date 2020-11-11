// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  // Load the data from a json file (you can make these using
  // JSON.stringify(YOUR_OBJECT), just remove the surrounding '')
  d3.csv("/data/pie_ii.csv", function(d) {
  	return {
      finding : d.finding,
  	};
  
  }).then(data => {

    // General event type for selections, used by d3-dispatch
    // https://github.com/d3/d3-dispatch
    const dispatchString = 'selectionUpdated';

    // Create a scatterplot given x and y attributes, labels, offsets; 
    // a dispatcher (d3-dispatch) for selection events; 
    // a div id selector to put our svg in; and the data to use.
    let pie_ii_1 = pie_chart()
      .selectionDispatcher(d3.dispatch(dispatchString))
      ('#vis2', data);

    pie_ii_1.selectionDispatcher().on(dispatchString, pie_ii_1.updateSelection);

  });

})());









