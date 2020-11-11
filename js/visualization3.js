// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  // Load the data from a json file (you can make these using
  // JSON.stringify(YOUR_OBJECT), just remove the surrounding '')
  d3.csv("/data/officers.csv", function(d) {
  	return {
      title : d.title,
      doa : d.doa,
      rank : d.rank,
   		ia_score : +d.ia_score,
    	total : +d.total,
    	overtime : +d.overtime,
      ia_sustained_allegations : +d.ia_sustained_allegations
  	};
	}).then(data => {

    console.log('hello');

    // General event type for selections, used by d3-dispatch
    // https://github.com/d3/d3-dispatch
    const dispatchString = 'selectionUpdated';

    // Create a scatterplot given x and y attributes, labels, offsets; 
    // a dispatcher (d3-dispatch) for selection events; 
    // a div id selector to put our svg in; and the data to use.
    let sp1 = scatterplot()
      .x(d => d.ia_score)
      .xLabel('IA SCORE')
      .y(d => d.total)
      .yLabel('TOTAL SALARY')
      .yLabelOffset(40)
      .selectionDispatcher(d3.dispatch(dispatchString))
      ('#vis3sp', data);

    let sp2 = scatterplot()
      .x(d => d.ia_score)
      .xLabel('IA SCORE')
      .y(d => d.total)
      .yLabel('TOTAL SALARY')
      .yLabelOffset(40)
      .selectionDispatcher(d3.dispatch(dispatchString))
      ('#vis3sp2', data);

    sp1.selectionDispatcher().on(dispatchString, sp2.updateSelection);

    sp2.selectionDispatcher().on(dispatchString, sp1.updateSelection);
    


    

  });

})());









