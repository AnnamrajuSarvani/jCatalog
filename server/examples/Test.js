var express = require("express"),
    app = express();
// var Sort = require("node-sort")
// , sort = new Sort();
var LINQ = require('node-linq').LINQ;

app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
var list=['price_head','tag_price','Price','product']
var alldata= [];

alldata.push({ name: "Bob", age: 1 });
alldata.push({ name: "Susan", age: 0 });
alldata.push( { name: "Kelly", age: 5 });
alldata.push({ name: "Ray", age: 1 });

//  var sortdata=new sort.bubbleSort(alldata[0], null); 
//   mergeSort.compare = function (a, b) {
//   // Sort by first name first
//   if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
//   if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
//   // Sort by last name second
//   if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
//   if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
//   return 0;
// };
// mergeSort.sort(alldata);

var data=mergeSort.groupBy(alldata,function(num){ return (num.age); });
// console.log(data);
  res.end(JSON.stringify(data)); 
}); 
app.listen(8080);


function sortdat(alldata)
{ 
	var o = new LINQ(alldata).GroupBy(function(row) { return row[0]; });
	return o;
}