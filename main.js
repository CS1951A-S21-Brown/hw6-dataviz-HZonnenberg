//*************************** Global Variables ***************************//
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 10, bottom: 150, left: 100};

let graph_1_width = (MAX_WIDTH *3/4) - 10, graph_1_height = 500;
let graph_2_width = (MAX_WIDTH *3/4) - 10, graph_2_height = 500;
let graph_3_width = 600;
let graph_3_height = 600;

let data_file = "data/video_games.csv";


//*************************** g1 variables, must be global ***************************//
let svg = d3.select("#graph1")
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

//*************************** g1 functions ***************************//
function g1_data(year){
    d3.csv(data_file).then(function(data) {
        data = cleanData(data, year);

        // set y axis
        y.domain([0, d3.max(data, function(d){ return parseFloat(d.Global_Sales);})]);

        
        // set x axis
        x.domain(data.map(function(d) {return d['Name'];}));
        
        // define color
        let color = d3.scaleOrdinal()
        .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), 10));
        
        //rotate x axis
        //text rotation code found on stack overflow
        axis_label.attr("transform", "translate(0, " + (graph_1_height - margin.bottom - margin.top) + ")")
            .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")
        ;

        // create bars
        let bars = svg.selectAll("rect").data(data);

        bars.enter()
            .append("rect")
            .merge(bars)
            .transition()
            .duration(1000)
            .attr("y", function(d) {return y(parseFloat(d['Global_Sales']));})
            .attr("x", function(d){
                return x(d['Name']);
            })
            .attr("width", x.bandwidth())
            .attr("height", function(d){
                return graph_1_height - margin.top - margin.bottom - y(parseFloat(d['Global_Sales']));
            })
            .attr("fill", function(d) { return color(d["Global_Sales"]) })
        ;

        // show counts above graph
        let counts = countRef.selectAll("text").data(data);
        
        counts.enter()
            .append("text")
            .merge(counts)
            .transition()
            .duration(1000)
            .attr("y", function(d) {return y(parseFloat(d['Global_Sales'])) - 10;})
            .attr("x", function(d) {return x(d["Name"]) + 5;})       
            .style("text-anchor", "start")
            .text(function(d) {return parseFloat(d["Global_Sales"]);})
        ;          
        
        bars.exit().remove();
        counts.exit().remove();
        
    });
    
}


function cleanData(data, year) {
    data = data.filter(vg => vg['Year'] == year);
    if(data.size < 10){
        console.log('error cleaning data');
        throw "Not enough videogames for selected year. Please try a different year" ;
    }

    // data is pre-sorted by global sales
    toRet = data.slice(0, 10);
    // manage duplicate names
    var i, j;
    for(i = 0; i < toRet.length; i++){
        for(j = i+1; j < toRet.length; j++){
            if(toRet[i]["Name"] == toRet[j]["Name"]){
                toRet[i]["Name"] = toRet[i]["Name"] + " (" + toRet[i]["Platform"] + ")";
                toRet[j]["Name"] = toRet[j]["Name"] + " (" + toRet[j]["Platform"] + ")";
            }
        }
    }
    return toRet;
}

//*************************** g2 variables, must be global ***************************//

let svg2 = d3.select("#graph2")
    .append("svg")
    .attr("width", graph_2_width)  
    .attr("height", graph_2_height)    
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
; 

let y2 = d3.scaleLinear()
    .range([graph_2_height - margin.top - margin.bottom, 0])
;

let axis_label2 = svg2.append("g");

let x2 = d3.scaleBand()
    .range([0, graph_2_width - margin.left - margin.right])
    .padding(0.1)
;

let countRef2 = svg2.append("g");

//*************************** g2 functions ***************************//
function g2_data(genre, v){
    d3.csv(data_file).then(function(data) {
        data = cleanDataG2(data, genre, v);

        // set y axis
        y2.domain([0, d3.max(data, function(d){ return parseFloat(d.Global_Sales);})]);

        
        // set x axis
        x2.domain(data.map(function(d) {return d['Publisher'];}));
        
        // define color
        let color = d3.scaleOrdinal()
        .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), 10));
        
        //rotate x axis
        //text rotation code found on stack overflow
        axis_label2.attr("transform", "translate(0, " + (graph_2_height - margin.bottom - margin.top) + ")")
            .call(d3.axisBottom(x2).tickSize(0).tickPadding(10))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")
        ;

        // create bars
        let bars = svg2.selectAll("rect").data(data);

        bars.enter()
            .append("rect")
            .merge(bars)
            .transition()
            .duration(1000)
            .attr("y", function(d) {return y2(parseFloat(d['Global_Sales']));})
            .attr("x", function(d){
                return x2(d['Publisher']);
            })
            .attr("width", x2.bandwidth())
            .attr("height", function(d){
                return graph_1_height - margin.top - margin.bottom - y2(parseFloat(d['Global_Sales']));
            })
            .attr("fill", function(d) { return color(d["Global_Sales"]) })
        ;

        // show counts above graph
        let counts = countRef2.selectAll("text").data(data);
        
        counts.enter()
            .append("text")
            .merge(counts)
            .transition()
            .duration(1000)
            .attr("y", function(d) {return y2(parseFloat(d['Global_Sales'])) - 10;})
            .attr("x", function(d) {return x2(d["Publisher"]) + 5;})       
            .style("text-anchor", "start")
            .text(function(d) {return (d["Global_Sales"]).toFixed(2);})
        ;          
        
        bars.exit().remove();
        counts.exit().remove();
        
    });
    
}

//helper for cleandataG2
function sorter(a, b){
    if(parseFloat(a["Global_Sales"]) > parseFloat(b["Global_Sales"])){
        return -1;
    }
    if(parseFloat(a["Global_Sales"]) < parseFloat(b["Global_Sales"])){
        return 1;
    }
    return 0;
}

function cleanDataG2(data, genre, v) {
    //get all genres
    g = []
    data.forEach(function (d){
        if(!g.includes(d["Genre"])){
            g.push(d["Genre"]);
        }
    });
    // console.log(g);

    data = data.filter(function(d) {return d["Genre"] == genre})

    accumulator = [];
    data.forEach(function (curval){

        var ifin = false;
        indexOf = -1;
        counter = -1;
        accumulator.forEach( function(d){
            counter += 1;
            if(curval["Publisher"] == d["Publisher"]){
                ifin = true;
                indexOf = counter;
            }
        });

        if(ifin){
            accumulator[indexOf]["Global_Sales"] = parseFloat(accumulator[indexOf]["Global_Sales"]) + parseFloat(curval["Global_Sales"]);
            accumulator[indexOf]["Count"] = parseInt(accumulator[indexOf]["Count"]) + 1;
        } else {
            let k = String(curval["Publisher"]);
            var dict = {
                "Publisher": k,
                "Global_Sales": parseFloat(curval["Global_Sales"]),
                "Count": 1
            };
            accumulator.push(dict);
        }
    });


    if(v == "avg"){
        accumulator.forEach(function(d){
            d["Global_Sales"] = parseFloat(d["Global_Sales"])/ parseInt(d["Count"]);
            // d["Global_Sales"] = parseFloat(d["Global_Sales"]);
        });
    }

    accumulator.sort(sorter);
    accumulator = accumulator.slice(0, 10);
    return accumulator;
}

//*************************** g3 global variables ***************************//

let svg3 = d3.select("#graph3").append("svg")
    .attr("width", graph_3_width)
    .attr("height", graph_3_height)
    .append("g")
    .attr("transform", "translate(" + graph_3_width/2 + "," + graph_3_height/2  + ")")
;

var color3 = d3.scaleOrdinal()
    .range(["#800000", "#9A6324", "#808000", "#469990", "#000075", "#911eb4",
    "#f032e6", "#42d4f4", "#3cb44b", "#ffe119", "#f58231", "#e6194b"])
;

var radius = Math.min(graph_3_width, graph_3_height)/3;

var pie = d3.pie();

//*************************** g3 functions ***************************//
function g3_data(region){
    d3.csv(data_file).then(function(data){
        data = cleanDataG3(data, region);
        pie.value((function(d) {return d.value}));

        var data_ready = pie(d3.entries(data))

        color3.domain(data);

        var arc = d3.arc().innerRadius(radius/2).outerRadius(radius)

        svg3.selectAll('bleh')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d) {return color3(d.data.key)})
        ;

        svg3.selectAll('bleh')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function(d){ return d.data.key})
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", 17)
            .style("font-weight", 10000)
        ;
        

    });
    
}


function cleanDataG3(data, region){
    //get all genres
    g = []
    data.forEach(function (d){
        if(!g.includes(d["Genre"])){
            g.push(d["Genre"]);
        }
    });

    ac = []
    var temp = 0;
    g.forEach(function(d) {
        ac.push({
            "Genre": d,
            "Regional_Sales": 0
        });
        temp += 1;
    });

    data.forEach(function (d){
        indexOf = -1;
        counter = -1;
        ac.forEach(function(item){
            counter += 1;
            if(ac[counter]["Genre"] == d["Genre"]){
                indexOf = counter;
            }
        });
        ac[indexOf]["Regional_Sales"] = parseFloat(ac[indexOf]["Regional_Sales"]) + parseFloat(d[region]);
    });

    console.log(ac);

    toret = {}
    ac.forEach(function(d){
        toret[String(d["Genre"])] = parseFloat(d["Regional_Sales"]);
    })
    console.log(toret);
    return toret;
}


//*************************** initial graph calls ***************************//
g1_data('1981');
g2_data('Sports');
g3_data('NA_Sales');


//*************************** interactive elements ***************************//

//genre picker
var avg = document.getElementById("avg");
var tot = document.getElementById("tot");
var g = document.getElementById("genrePicker");
g.onchange = function() {
    var v = "";
    if(tot.checked){
        v = tot.value;
    } else if(avg.checked){
        v = avg.value;
    }
    g2_data(this.value, v);
}

//radio buttons (normalizing)
avg.onclick = function(){
    g2_data(document.getElementById("genrePicker").value, this.value);
}
tot.onclick = function(){
    g2_data(document.getElementById("genrePicker").value, this.value);
}

// slider
var slider = document.getElementById("YearSelector");
var output = document.getElementById("yearLabel");
output.innerHTML = "Year Selector: " + slider.value;

// Update the current slider value
slider.oninput = function() {
  output.innerHTML = "Year Selector: " + this.value;
  g1_data(this.value.toString());
}

//region picker
var r = document.getElementById("regionPicker");
r.onchange = function() {
    g3_data(this.value);
}