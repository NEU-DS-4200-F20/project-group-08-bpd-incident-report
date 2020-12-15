# Put the JavaScript code you write in this folder

We recommend you separate the implementation details for individual visualizations using the [Reusable Charts](https://bost.ocks.org/mike/chart/) framework Mike Bostock advocates.
Broadly this means implementing visualizations as closures with getter-setter methods.
This can be further extended to [making updatable charts](https://www.toptal.com/d3-js/towards-reusable-d3-js-charts).

All files in the old folder, are unused javascript files for previous versions of our visualization that we ended up not using. 

Scatterplot2.js is a file containing the generic builder for a scatterplot. It takes in data, data names, axis titles, header title, etc. It creates a scatterplot with the given values that can be connected through a dispatcher allowing linking between tables. 

Visualization3.js is what calls Scatterplot2.js to create the two scatter plots in our visualization. As well as, calling the dispatcher on the two scatter plots, connecting them allowing for brushing and linking. It is also here where we pass what data goes into the scatter plot, and what should be on the X and Y axis and what the visual should be titled. The csv data is read in this file.

visX1.js, visX2.js, visX3.js, & visX4.js are all files creating individual pie charts for the visual. This was not created in a generic visual fashion, as these pie charts did not need to be linked with each other, and were all stand alone visuals. 