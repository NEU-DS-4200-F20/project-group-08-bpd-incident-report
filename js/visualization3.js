// Immediately Invoked Function Expression to limit access to our
// variables and prevent
((() => {

  d3.csv("./data/officersfiltered.csv", function(d) {
  	return {
      rank : d.rank,
   		yof : +d.yof,
    	total : +d.total,
      rounded_total : +d.rounded_total,
      ia_sustained_allegations : +d.ia_sustained_allegations

  	};
	}).then(data => {

    // General event type for selections, used by d3-dispatch
    // https://github.com/d3/d3-dispatch
    const dispatchString = 'selectionUpdated';

    // Create a scatterplot given x and y attributes, labels, offsets;
    // a dispatcher (d3-dispatch) for selection events;
    // a div id selector to put our svg in; and the data to use.


    let sp1 = scatterplot2()
      .x(d => d.yof)
      .xLabel('YEARS ON THE FORCE')
      .y(d => d.ia_sustained_allegations)
      .yLabel('# OF SUSTAINED ALLEGATIONS')
      .headerLabel('NUMBER OF YEARS ON THE FORCE VS NUMBER OF SUSTAINED ALLEGATIONS')
      .yLabelOffset(40)
      .selectionDispatcher(d3.dispatch(dispatchString))
      ('#vis3sp', data);

    let sp2 = scatterplot2()
      .x(d => d.rounded_total)
      .xLabel('TOTAL SALARY IN 2019 (USD)')
      .y(d => d.ia_sustained_allegations)
      .yLabel('# OF SUSTAINED ALLEGATIONS')
      .headerLabel('SUSTAINED ALLEGATIONS PER YEAR ON THE FORCE VS SALARY')
      .yLabelOffset(40)
      .selectionDispatcher(d3.dispatch(dispatchString))
      ('#vis3sp2', data);



    sp1.selectionDispatcher().on(dispatchString, sp2.updateSelection);

    sp2.selectionDispatcher().on(dispatchString, sp1.updateSelection);



  });

})());
