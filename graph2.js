// Add your JavaScript code here

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;

let data_file = "data/video_games.csv";

// declare the following so that they reset upon interaction
let svg = d3.select("#graph2")
    .append("svg")
    .attr("width", graph_1_width)  
    .attr("height", graph_1_height)    
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
; 

let y = d3.scaleLinear()
    .range([graph_1_height - margin.top - margin.bottom, 0])
;

let axis_label = svg.append("g");

let x = d3.scaleBand()
    .range([0, graph_1_width - margin.left - margin.right])
    .padding(0.1)
;

let countRef = svg.append("g");

// chart title
// svg.append("text")
//     .attr("transform", `translate(${graph_1_width/2 - margin.left/2 - margin.right/2}, -10)`)
//     .style("text-anchor", "middle")
//     .text("Top 10 videogame sales by release year, measured in millions")
// ;

//graph 1 data management
function g2_data(genre){
    d3.csv(data_file).then(function(data) {
        data = cleanDataG2(data, genre);

        // set y axis
        y.domain([0, d3.max(data, function(d){ return parseFloat(d.Global_Sales);})]);

        
        // set x axis
        x.domain(data.map(function(d) {return d['Name'];}));
        
        // define color
        let color = d3.scaleOrdinal()
        .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), 10));
        
        //rotate x axis
        //text rotation code found on stack overflow
        // @TA: the x margin.bottom is not working as expected
        axis_label.attr("transform", "translate(0, " + (graph_1_height - margin.bottom - margin.top) + ")")
            .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
        ;
        
    });
    
}


function cleanDataG2(data, genre) {
    data = data.filter(function(d) {d.Genre == genre})
    var dict = {}
    for(d in data){
        if(!(d["Name"] in dict)){
            dict[d["Name"]] = 0;
        } 
        dict[d["Name"]] = parseFloat(dict[d["Name"]]) + parseFloat(d["Global_Sales"]);
    }

    var toret = [], item
    for(var type in dict){
        item = {}
        item.type = type;
        item.name = dict[type];
        toret.push(item);
    }
    console.log(toret);
}

genre = "Sports"
g2_data(genre);