d3.csv('../data/cycling.csv', (csv) ->

	# data that you want to plot, I've used separate arrays for x and y values
	xdata = []
	ydata = []
	
	for track in csv
		xdata.push track['Date']
		ydata.push track['Average Moving Speed']
		
	console.log xdata
	console.log ydata
	
	# size and margins for the chart
	margin = {top: 20, right: 15, bottom: 60, left: 60}
	width = 960 - margin.left - margin.right
	height = 500 - margin.top - margin.bottom
	
	# x and y scales, I've used linear here but there are other options
	# the scales translate data values to pixel values for you
	
	minDate = date(xdata[0])
	maxDate = date(xdata[xdata.length-1])
	
	x = d3.time.scale()
	          .domain([minDate, maxDate])  # the range of the values to plot
	          .range([ 0, width ])        # the pixel range of the x-axis
	
	y = d3.scale.linear()
	          .domain([0, d3.max(ydata)])
	          .range([ height, 0 ])
	
	# the chart object, includes all margins
	chart = d3.select('#content')
		.append('svg:svg')
		.attr('width', width + margin.right + margin.left)
		.attr('height', height + margin.top + margin.bottom)
		.attr('class', 'chart')
	
	# the main object where the chart and axis will be drawn
	main = chart.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.attr('width', width)
		.attr('height', height)
		.attr('class', 'main')   
	
	# draw the x axis
	xAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom')
	
	main.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.attr('class', 'main axis date')
		.call(xAxis)
	
	# draw the y axis
	yAxis = d3.svg.axis()
		.scale(y)
		.orient('left')
	
	main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis)
	
	# draw the graph object
	g = main.append("svg:g") 
	
	ytrans = (d) -> y(d)
	xtrans = (d,i) -> x(date(xdata[i]))
	
	g.selectAll("scatter-dots")
	  .data(ydata)  # using the values in the ydata array
	  .enter().append("svg:circle")
	      .attr("cy", ytrans )
	      .attr("cx", xtrans )
	      .attr("r", 10)
	      .style("opacity", 0.6) # opacity of circle

)

date = (stringDateTime) ->
	dateTimeParts = stringDateTime.split(' ')
	dateParts = dateTimeParts[0].split('/')
	new Date(dateParts[2],dateParts[1],dateParts[0])