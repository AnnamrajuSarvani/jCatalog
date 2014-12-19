    var express = require("express"),
    app = express(),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),
    Converter=require("csvtojson").core.Converter;
    var mergeSort = require("underscore");
    var S = require('string');

app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();
  var column='';
  var columnValue='';
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/json'});  
    column=fields.column;
    columnValue=fields.textV;
  });

  form.on('end', function(fields, files) {
    var temp_path = this.openedFiles[0].path;
    var file_name = this.openedFiles[0].name;
    var new_location = 'uploads/';
    fs.copy(temp_path, new_location + file_name, function(err) {  
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
          /*Opening File for reading*/
        var csvFileName=new_location+file_name;
        var fileStream=fs.createReadStream(csvFileName);
        var param={};        
        var result = [];
        var csvConverter=new Converter(param);
        csvConverter.on("end_parsed",function(jsonObj){
          var test=new sortfn(result);          
          res.end(JSON.stringify(test));
        });
      csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {       
        var row={};
        for (var key in resultRow) {   
        if(key=="Action Code") row[key]= toLC(resultRow[key]);
        else if(key=="Sup Part Num")row[key]= toUC(resultRow[key]).s;      
        else if(key=="Classification_id")row[key]= toCamelize(resultRow[key]).s;      
        else if(key=="retail_price_quantity"){row[key]= resultRow[key]; MatchArry(resultRow[key],'2',1) }
        else
        row[key]= resultRow[key];        
        }
        result.push(row); 
      });
      /*End*/
      fileStream.pipe(csvConverter);
      }
    });
  });
});

// Show the upload form 
app.get('/', function (req, res){
  res.writeHead(200, {'Content-Type': 'text/html' });
  /* Display the file upload form. */
  var form = '<form action="/upload" enctype="multipart/form-data" method="post">'+
  'Default Column:<input name="column" type="text" /><br/><br/>  Default Value:<input name="textV" type="text" /> <br/><br/>'+
  '<input name="title" type="text" /> <input multiple="multiple" name="upload" type="file" />  <input type="submit" value="Upload" /></form>';
  res.end(form); 
}); 
app.listen(8080);

function sortfn(data)
{
  var val = data[0];
    var sub_key,sub_key1;
    var i=0;
    for(j in val){

       if(i==0)  sub_key = j;
       i++;
     }  
     val=data[1];
     var k=0;
     for(j in val){

       if(k==0)  sub_key1 = j;
       i++;
     }      
  var tmp2 = {};
  tmp2 = mergeSort.groupBy(data, function(d){return d[sub_key]; });
  var finalResult = [];
  // mergeSort.each(tmp2, function(items, unit){
  var parm=[];tot={};obj={};
  mergeSort.each(data, function(item){      
    var key = "gjkghjk";    
    var value = "gvfjhgjk"; objk=[];
    var val = item;
    for(j in val)
    {
      var sub_keys = j;
      var sub_val = val[j];   
      obj[sub_keys] = sub_val; 
    }
     // });
  finalResult.push(obj);
  });
return finalResult;
}

function toLC(data){
    var row='';
    var k=data; 
    row= k.toLowerCase();            
    return row;
}
function toUC(data){
    var row='';    
    row= S(data).capitalize();   
    return row;
}
function toCamelize(data){
    var row='';    
    row= S(data).camelize();   
    return row;
}
function toCWS(data){
    var row='';    
    row= S(data).collapseWhitespace();   
    return row;
}
function toRDelimiter(data){
    var row='';    
    row= data.replace(/[^\w\s]/gi, '');   
    return row;
}
function MatchArry(data,vl,n){
    var row='';
    var reexpn=new RegExp('^((?:'+vl+'+\\|\\|){' + (n-1) + '})('+vl+'+)\|\|');  
    var op=data.match(reexpn);
    console.log(op);  
    // row= data.replace(/[^\w\s]/gi, '');   
    // return row;
}
function toFOL(data,n){
  //Provide Negitive Value of n to get right value
    var row='';    
    row= S(data).left(n);   
    return row;
}
// function toL(data,n){
//   //Provide Negitive Value of n to get right value
//     var row='';    
//     row= S(data).right(n);   
//     return row;
// }
function append(data,vl){
    var s = new Buffer(data);
    var p = new Buffer(vl);
    s = Buffer.concat([s,p]);
    return s;
}
function prepand(data,vl){
    var s = new Buffer(data);
    var p = new Buffer(vl);
    s = Buffer.concat([p,s]);
    return s;
}

