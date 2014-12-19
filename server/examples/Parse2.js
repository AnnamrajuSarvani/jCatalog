    var express = require("express"),
    app = express(),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),
    Converter=require("csvtojson").core.Converter;
    var mergeSort = require("underscore");
    

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
        });
      csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
        var row={};
        for (var key in resultRow) {         
        row[key]= resultRow[key];        
        }result.push(row); 
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
app.listen(8000);

function sortfn(data)
{
  var val = data[0];
    var sub_key,sub_key1;var matchedcol=matchcolumn(data);
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
   mergeSort.each(items, function(item){      
     var key = "gjkghjk";    
    var value = "gvfjhgjk"; objk=[];
     var val = item;obj={};
    for(j in val)
     {
      var sub_keys = j;
      var sub_val = val[j];
      if(sub_val!=unit)
      {             
        if(matchedcol!=[]){

            for(var k in matchedcol){
            var vl=matchedcol[k].split(',');
            for(var l=1;l<vl.length;l++){
            if(vl.indexOf(sub_keys)!=-1)
            { 

            if( vl[l]==sub_keys) 
            {  
              objk.push({attributeId: sub_keys.split('_')[0],
               attributeType: sub_keys.split('_')[1],
               attributeValue: sub_val});      
                

             if(l==vl.length-1)
             { obj[sub_keys.split('_')[0]+'s']=objk;}
            }               
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
return finalResult;
}

function matchcolumn(data)
{ 
  var matchedcol=[];
  var keys=[];objk=[];
  var val = data[0];
  for(j in val){
    keys.push(j);
  }
  for(var i in keys){
    var cols=''; 
      var cmp=keys[i].split('_');    
      for(var ln=0;ln<cmp.length;ln++)
      {   
        for(var k=0;k<keys.length;k++)
        { 
         if(i!=k){
        var cls=keys[k];
        var expn=  new RegExp(".*"+cmp[ln]+".*", "i");
        if(cls.match(expn) && cols.indexOf(keys[k])==-1) {
          if(cols.length==0)
          cols+=cmp[ln]+','+keys[i]+','+keys[k];
          else cols+=','+keys[k];                 
         }
      }
      var assn=true;
    for(f in matchedcol){
      var spn=(matchedcol[f].length>0)?matchedcol[f].split(','):'';      
      for(n in spn) {if (keys[i]==spn[n] || keys[k]==spn[n]) {assn=false;break;}}
    }
      if(k==keys.length-1 && cols.length>0 && assn==true){matchedcol[cols.split(',')[0]]=cols;}
     }           
    } 
  }     
  return matchedcol;  
}