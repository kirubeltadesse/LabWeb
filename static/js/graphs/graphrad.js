var dataset = [1,2,3,4,5] ;

function passData(dataset){
    var arr = [];
    for(var i in dataset){
        // console.log(i);
        arr.push({
            data: dataset[i],
            value: channelCapacity(dataset[i]) //channelCapacity(BW=20, VTx=3,3, a=dataset[i], Cl=500, R=10)
        });
    }
    drawChart(arr);
    return arr;
}
passData(dataset);

function drawChart(data){
    var svgWidth = 600, svgHeight = 400;
    var margin = { top: 50, right: 50, bottom: 50, left: 50};
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("cursor", "crosshair");

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) {return x(d.data)})
        .y(function(d) {return y(d.value)})
        .curve(d3.curveMonotoneX) //apply smoothing to the line
    // .curve(d3.curveCardinal)
    x.domain(d3.extent(data, function(d) { return d.data}));
    // y.domain(d3.extent(data, function(d) { return d.value}));
    // x.domain([0,5]);
    y.domain([16,26]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("fill","#000")
        .attr("transform","rotate(0)")
        .attr("x", width)
        .attr("y", 30)
        .attr("dx", "0.71em")
        .attr("text-anchor","end")
        .text("Device Radius, HBC (cm) ");
    // .remove();


    // writing on the graph
    g.append("g")
        .attr("transform", "translate(150,"+ 0 + ")")
        .append("text")
        .attr("fill", "steelblue")
        .text("Channel Capacity HBC")

    g.append("g")
        .attr("transform", "translate(150,"+ 20 + ")")
        .append("text")
        .attr("fill", "#FF0000")
        .text("Channel Capacity Bluetooth")

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill","#000")
        // .attr("transform","rotate(-90)")
        .attr("transform","rotate(-90)")
        .attr("y", -25)
        // .attr("dy", "0.7lem")
        .attr("text-anchor", "end")
        .text("Channel Capacity (Mbps)");

    var path = g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    // .on("mousemove", mousemoved);


    g.append("line")
        .attr("x1", x(1))
        .attr("y1", y(21))
        .attr("x2", x(400))
        .attr("y2", y(21))
        .style("stroke-dasharray","5,5")//dashed array for line
        .attr("stroke", "red");
    var rad = 2


    g.selectAll("circle")
        .data(data.filter(function(d){  return d; }))
        .enter()
        .filter(function(d){ return d.data == rad; })
        // .data(rad).enter()
        .append("circle")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr("fill", "rad")

    // A function that update the chart when slider is moved?
    function updateChart(radius) {
        // recompute density estimation
        // console.log("this is the x tick",x.ticks(radius))
        // var mydata= x.ticks(radius);
        // kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(binNumber))
        // density =  kde( data.map(function(d){  return d.price; }) )
        rad = radius;
        // console.log(radius);
        // test
        //     .transition()
        //     .duration(1000)
        var test =  //svg.append("g")
            g.selectAll("circle")
                .attr("cx", x(rad))
                .attr("cy", y(channelCapacity(rad)))
                .attr("fill", "red")

    }

    // Listen to the radius slider?
    d3.select("#radius").on("change", function(d){
        selectedValue = this.value/100;
        updateChart(selectedValue)

    })

}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}


function channelCapacity (a){
    var BW = 10;
    var VTx = 3.3;
    var R = 10;
    var Cl = 5 * Math.pow(10, -12 );
    var res = BW *(2*Math.log(getBaseLog(2, (VTx * Math.pow(a, 2))/(Cl* Math.sqrt(R*BW)))) - 5.2101)
    return res;
}
