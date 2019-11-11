var dataset = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
var yValues = [20, 100, 400, 600]

function passData(dataset){
    var arr = [];
    for(var i in dataset){
        // console.log(i);
        arr.push({
            data: dataset[i],
            value: channelCapacityband(dataset[i])
        });
    }
    drawband(arr);
    return arr;
}
passData(dataset);

function drawband(data){
    // var svgWidth = 600, svgHeight = 400;
    // var margin = { top: 50, right: 50, bottom: 50, left: 50};
    // var width = svgWidth - margin.left - margin.right;
    // var height = svgHeight - margin.top - margin.bottom;
    //
    // var svg = d3.select("#bandwidth")
    //     .attr("width", svgWidth)
    //     .attr("height", svgHeight);

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 100, bottom: 50, left: 30},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#bandwidth")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("cursor", "crosshair")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var y = d3.scaleLog()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) {return x(d.data)})
        .y(function(d) {return y(d.value)})
        // .curve(d3.curveMonotoneX) //apply smoothing to the line
        .curve(d3.curveCardinal)
    x.domain(d3.extent(data, function(d) { return d.data}));
    // y.domain(d3.extent(data, function(d) { return d.value}));
    // x.domain([0,5]);
    y.domain([1*Math.pow(10,6),600 *Math.pow(10,6)]);

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
        .text("Bandwidth, HBC (MHz) ");
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
        .attr("y1", y(20*Math.pow(10,6)))
        .attr("x2", x(width))
        .attr("y2", y(20*Math.pow(10,6)))
        .style("stroke-dasharray","5,5")//dashed array for line
        .attr("stroke", "red");
    // .attr("stroke-linejoin", "round")
    // .attr("stroke-linecap", "round")
    // .attr("stroke-width", 1.5)

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

    // svg.append("rect")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .on("mousemove", mousemoved);

    // for the visualizaiton

    // A function that update the chart when slider is moved?
    function updateband(bandwidth) {
        // recompute density estimation
        // console.log(x.ticks(radius))
        // kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(binNumber))
        // density =  kde( data.map(function(d){  return d.price; }) )
        band = bandwidth;
        var test =  //svg.append("g")
            g.selectAll("circle")
                .attr("cx", x(band))
                .attr("cy", y(channelCapacityband(band)))
                .attr("fill", "red")

    }

    // Listen to the bandwidth slider
    d3.select("#bandwidthSider").on("change", function(d){
        bandValue = this.value;
        updateband(bandValue)
    })


    // Listen to the radius slider?
    // d3.select("#radius").on("change", function(d){
    //     radValue = this.value/100;
    //     updateChart(selectedValue)
    // })

}

// function getBaseLog(x, y) {
//     return Math.log(y) / Math.log(x);
// }
function channelCapacityband(BW){
    // var radslider = document.getElementById("radius");
    // console.log("this is a: ",a);
    // var a = radslider.value/100

    var BW = BW * 1000000;
    var a = 2.5 * Math.pow(10, -2);
    var VTx = 3.3;
    var R = 10000;
    var Cl = 5 * Math.pow(10, -12);
    var res = BW *(2*Math.log(getBaseLog(2, (VTx * Math.pow(a, 2))/(Cl* Math.sqrt(R*BW))) - 5.2101));
    console.log(BW);
    return res;
}