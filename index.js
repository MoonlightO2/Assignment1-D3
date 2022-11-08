var margin = {top:0,left:0,right:0,bottom:0},
height = 900,
width = 900;
 
var svg = d3.select("#map")
.append("svg")
.attr("height", height)
.attr("width", width)
.append("g")
.attr("id","svg_id");

var elab = d3.geoNaturalEarth1()
.translate([width/2, height/2])
.scale(3000)
.center([-5, 53])
var path = d3.geoPath().projection(elab);

//UK Map
d3.json('https://yamu.pro/gb.json', function(error, data) {
console.log(data);
svg.selectAll(".uk")
.data(data.features)
.enter().append("path")
.attr("class","uk")
.attr("d",path)
.append('title')
.text("Town: "+ uktown + ", " + "County: " + ukcounty  + ", " + "Population: " + population);
 });

//UK City File mapping
d3.json('http://34.78.46.186/Circles/Towns/' + 'sliderval', function(error, data) {
console.log(data);
svg.selectAll('.uktowns')
.data(data)
.enter().append('svg:image')
.attr("class","uktowns")
.attr("transform", function (d) {
return "translate(" + -20 / 2 + "," + -20 / 2 + ")";
})
.attr("xlink:href", function (d) {
return 'locationpin.png';
})
.attr("x",function(d){
console.log(d);
var latlng = elab([d.lng, d.lat])
return latlng[0];
})
.attr("y",function(d){
var latlng = elab([d.lng, d.lat])
return latlng[1]
})

//Display random towns
//Searching for code

//City data
svg.selectAll('ukcity')
.data(data)
.enter()
.append('text')
.attr('class','ukcity')
.attr("x",function(d){
console.log(d);
var latlng = elab([d.lng, d.lat, d.Town.random])
return latlng[0];
})
.attr("y",function(d){
var latlng = elab([d.lng, d.lat,d.Town])
return latlng[1]
}).text(function(d){
var latlng = elab([d.lng, d.lat,d.Town])
console.log(d.Town);
return d.Town;
})
.attr('dx','2')
.attr('dy','2')
});

//Slider
var slider = document.getElementById("range1");
var sliderval = document.getElementById("range2");
sliderval.innerHTML = slider.value;

slider.oninput = function() {
console.log(this.value);
//document.getElementById('map').innerHTML = " ";
//load(this.value);
sliderval.innerHTML = this.value;
}

//Tooltip
var uktown =  10
var latitude = 20
var longitude = 30
var population = 40
var ukcounty = 50

var style = document.createElement('style');
document.head.appendChild(style);

var matchingElements = [];
var allElements = document.getElementsByTagName('*');
for (var i = 0, n = allElements.length; i < n; i++) {
    var attr = allElements[i].getAttribute('data-tooltip');
    if (attr) {
        allElements[i].addEventListener('mouseover', hoverEvent);
    }
}

function hoverEvent(event) {
    event.preventDefault();
    x = event.x - this.offsetLeft;
    y = event.y - this.offsetTop;
    y += 10;
    style.innerHTML = '*[data-tooltip]::after { left: ' + x + 'px; top: ' + y + 'px  }'

}