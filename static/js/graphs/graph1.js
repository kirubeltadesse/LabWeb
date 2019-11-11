// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", function(data) {
// d3.csv("../data/data.csv", function(data){
    // add the x Axis
    var x = d3.scaleLinear()
        .domain([0, 1000])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 0.01]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Compute kernel density estimation
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))
    var density =  kde( data.map(function(d){  return d.price; }) )
    console.log(density)

    // Plot the area
    var curve = svg
        .append('g')
        .append("path")
        .attr("class", "mypath")
        .datum(density)
        .attr("fill", "#69b3a2")
        .attr("opacity", ".8")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })
        );

    // A function that update the chart when slider is moved?
    function updateChart(binNumber) {
        console.log(x.ticks(binNumber))
        // recompute density estimation
        kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(binNumber))
        density =  kde( data.map(function(d){  return d.price; }) )
        // console.log(binNumber)
        // console.log(density)

        // update the chart
        curve
            .datum(density)
            .transition()
            .duration(1000)
            .attr("d",  d3.line()
                .curve(d3.curveBasis)
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return y(d[1]); })
            );
    }
    // Listen to the slider?
    d3.select("#mySlider").on("change", function(d){
        selectedValue = this.value
        updateChart(selectedValue)
        channelCapacity(selectedValue/100, 1, 1, 1, 1)
    })

});


// Function to compute density
function kernelDensityEstimator(kernel, X) {
    return function(V) {
        return X.map(function(x) {
            return [x, d3.mean(V, function(v) { return kernel(x - v); })];
        });
    };
}
function kernelEpanechnikov(k) {
    return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
}


// Function for the channel capacity

// declaring the constants Bandwidth of the channel (BW), transmitted signal voltage (VTx), device radius (a)
// load capcitance (Cl), Input referred impedance at receiver end (R)

var BW = 1;
var VTx = 1;
var a = 1;
var Cl = 1;
var R = 1;

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}


function channelCapacity (BW, VTx, a, Cl, R){
    var res = BW *(2*Math.log(getBaseLog(2, (VTx * Math.pow(a, 2))/(Cl* Math.sqrt(R*BW)))) - 5.2101)
    console.log("this is the result", res)
    return res;
}
// TODO: create log function to have a sample result dataset


