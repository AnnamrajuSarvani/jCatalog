var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Db1');
var Schema = mongoose.Schema;
var express = require("express"),
app = express();

var jsonSchema = new Schema({ jsonD:{current_date:Date, close: String} });
var model = mongoose.model('jsonData', jsonSchema);
app.get('/', function (req, res){
  	model.find({},'jsonD', function(err, attribute) {
  		arr=[];
        if (!err) {
            // console.log(attribute[0].jsonD);
        attribute.forEach(function(element, index, attribute){   
           arr.push(attribute[index].jsonD);
    	});  
    res.end(JSON.stringify(arr));
    	}
    });
});
app.listen(3000);

function getData(){
    model.find({},'jsonD', function(err, attribute) {
        arr=[];
        if (!err) {
            // console.log(attribute[0].jsonD);
        attribute.forEach(function(element, index, attribute){    
            // console.log(attribute[index].jsonD);
           arr.push(attribute[index].jsonD);

        });  
    // res.end(JSON.stringify(arr));
        }
    });
    return JSON.stringify(arr);
}
