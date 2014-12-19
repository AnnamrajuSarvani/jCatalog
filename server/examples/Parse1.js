var express = require("express"),
    app = express(),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),
    Converter=require("csvtojson").core.Converter;
     var mergeSort = require("underscore");
     var LINQ = require('node-linq').LINQ;
    // qt   = require('quickthumb');

// Use quickthumb
// app.use(qt.static(__dirname + '/'));

app.post('/upload', function (req, res){
  // console.log(req.column);
  var form = new formidable.IncomingForm();
  var column='';
  var columnValue='';
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/json'});
    // res.write('received upload:\n\n');
    // res.end(util.inspect({fields: fields, files: files}));   
    column=fields.column;
    columnValue=fields.textV;
    // res.end(column,columnValue);
  });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;


    /* Location where we want to copy the uploaded file */
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
        
        var result = []

        var csvConverter=new Converter(param);
          //end_parsed will be emitted once parsing finished
        csvConverter.on("end_parsed",function(jsonObj){
        //here is your result json object     
          var test=new sortfn(result);
          // console.log(test);
           res.end(JSON.stringify(test));
        // fs.writeFile("outpuData.json",JSON.stringify(jsonObj, null, " "));

        });
        //read from file
        /*Transforming data*/
      csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
        var row={};
        for (var key in resultRow) {         
        row[key]= resultRow[key];        
        }result.push(row); 
      });
      /*End*/
      fileStream.pipe(csvConverter);

        /**/


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
    var sub_key,sub_key1;var matchedcol=relatedCol(data);
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
mergeSort.each(tmp2, function(items, unit){
  var parm=[];tot={};
  // mergeSort.each(t, function(items, currency){   
   mergeSort.each(items, function(item){      
     var key = "gjkghjk";    
    var value = "gvfjhgjk"; objk={};
     var val = item;obj={};
    for(j in val)
     {
      var sub_keys = j;
      var sub_val = val[j];
      if(sub_val!=unit)
      {
        if(matchedcol.length>0){
          for(var k in matchedcol){
            var vl=matchedcol[k].split(',');
            for(var l=0;l<vl.length;l++){
            if(vl.indexOf(sub_keys)!=-1)
            {     
            if( vl[l]==sub_keys) 
            {    
              objk[sub_keys]=sub_val;
             if(l==vl.length-1)
             { obj[sub_keys]=objk;}
            }    
            // }
            // else if(vl[1]==sub_keys)
            // {
            //   objk[sub_keys+' type']=sub_val;
            //  obj[sub_keys]=objk;
            }
            else 
            {
              obj[sub_keys] = sub_val;
            }
          }

          }
        }
        else{
        obj[sub_keys] = sub_val; 
         }
      }
      
      }   
        parm.push(obj);  
     });
  tot[sub_key]=unit,
  tot["attributes"]=parm;
  finalResult.push(tot);
  });
// });
return finalResult;
}

function relatedCol(data){
  var matchedcol=[];
  var keys=[];
  var val = data[0];
  for(j in val){
    keys.push(j);
  }
  for(var i in keys){
    var cols='';
    for(var k=0;k<keys.length;k++)
    {          
    if(i!=k){
      var cls=keys[k];
      var expn=  new RegExp(".*"+keys[i]+".*", "i");
      if(cls.match(expn)) {cols+=(cols.length==0)?cls+','+keys[i]:','+keys[k]; console.log(keys[i]);}
    } 
    }
  if(cols.length>0) matchedcol.push(cols); 
  }
  console.log(matchedcol);
  return matchedcol;
}

