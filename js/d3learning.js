(function() {
  var date;

  d3.csv('../data/cycling.csv', function(csv) {
    var chart, g, height, main, margin, maxDate, minDate, track, width, x, xAxis, xdata, xtrans, y, yAxis, ydata, ytrans, _i, _len;
    xdata = [];
    ydata = [];
    for (_i = 0, _len = csv.length; _i < _len; _i++) {
      track = csv[_i];
      xdata.push(track['Date']);
      ydata.push(track['Average Moving Speed']);
    }
    console.log(xdata);
    console.log(ydata);
    margin = {
      top: 20,
      right: 15,
      bottom: 60,
      left: 60
    };
    width = 960 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    minDate = date(xdata[0]);
    maxDate = date(xdata[xdata.length - 1]);
    x = d3.time.scale().domain([minDate, maxDate]).range([0, width]);
    y = d3.scale.linear().domain([d3.min(ydata), d3.max(ydata)]).range([height, 0]);
    chart = d3.select('#content').append('svg:svg').attr('width', width + margin.right + margin.left).attr('height', height + margin.top + margin.bottom).attr('class', 'chart');
    main = chart.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('width', width).attr('height', height).attr('class', 'main');
    xAxis = d3.svg.axis().scale(x).orient('bottom');
    main.append('g').attr('transform', 'translate(0,' + height + ')').attr('class', 'main axis date').call(xAxis);
    yAxis = d3.svg.axis().scale(y).orient('left');
    main.append('g').attr('transform', 'translate(0,0)').attr('class', 'main axis date').call(yAxis);
    g = main.append("svg:g");
    ytrans = function(d) {
      return y(d);
    };
    xtrans = function(d, i) {
      return x(date(xdata[i]));
    };
    return g.selectAll("scatter-dots").data(ydata).enter().append("svg:circle").attr("cy", ytrans).attr("cx", xtrans).attr("r", 10).style("opacity", 0.6);
  });

  date = function(stringDateTime) {
    var dateParts, dateTimeParts;
    dateTimeParts = stringDateTime.split(' ');
    dateParts = dateTimeParts[0].split('/');
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  };

}).call(this);
