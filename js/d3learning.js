(function() {
  var date;

  d3.csv('data/cycling.csv', function(csv) {
    var chart, g, height, main, margin, maxDate, minDate, series, seriestrans, track, width, x, xAxis, xdata, xtrans, y, yAxis, ydata, ytrans, _i, _len;
    xdata = [];
    ydata = [];
    series = [];
    for (_i = 0, _len = csv.length; _i < _len; _i++) {
      track = csv[_i];
      xdata.push(track['Date']);
      ydata.push(track['Average Moving Speed']);
      series.push(track['Description'] === 'West Didsbury to Altrincham ');
    }
    margin = {
      top: 20,
      right: 15,
      bottom: 60,
      left: 60
    };
    width = 960 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    minDate = date(xdata[0]);
    minDate.setDate(minDate.getDate() - 1);
    maxDate = date(xdata[xdata.length - 1]);
    x = d3.time.scale().domain([minDate, maxDate]).range([0, width]);
    y = d3.scale.linear().domain([d3.min(ydata) - 0.3, d3.max(ydata)]).range([height, 0]);
    chart = d3.select('#content').append('svg:svg').attr('width', width + margin.right + margin.left).attr('height', height + margin.top + margin.bottom).attr('class', 'chart');
    main = chart.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').attr('width', width).attr('height', height).attr('class', 'main');
    xAxis = d3.svg.axis().scale(x).orient('bottom');
    main.append('g').attr('transform', 'translate(0,' + height + ')').attr('class', 'axis').call(xAxis);
    yAxis = d3.svg.axis().scale(y).orient('left');
    main.append("text").attr("class", "label").attr("text-anchor", "end").attr("y", 6).attr("dy", ".75em").attr("transform", "rotate(-90)").text("average speed (mph)");
    main.append('g').attr('transform', 'translate(0,0)').attr('class', 'axis').call(yAxis);
    g = main.append("svg:g");
    ytrans = function(d) {
      return y(d);
    };
    xtrans = function(d, i) {
      return x(date(xdata[i]));
    };
    seriestrans = function(d, i) {
      if (series[i]) {
        return 'orange';
      } else {
        return 'green';
      }
    };
    return g.selectAll("scatter-dots").data(ydata).enter().append("svg:circle").attr("cy", ytrans).attr("cx", xtrans).attr("r", 5).style("opacity", 0.8).style("fill", seriestrans);
  });

  date = function(stringDateTime) {
    var dateParts, dateTimeParts;
    dateTimeParts = stringDateTime.split(' ');
    dateParts = dateTimeParts[0].split('/');
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  };

}).call(this);
