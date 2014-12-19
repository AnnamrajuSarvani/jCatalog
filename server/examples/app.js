var express = require("express"),
    app = express(),
    formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),
    Converter=require("csvtojson").core.Converter;
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
        

        var csvConverter=new Converter(param);
          //end_parsed will be emitted once parsing finished
        csvConverter.on("end_parsed",function(jsonObj){
        //here is your result json object     
           res.end(JSON.stringify(jsonObj));
        // fs.writeFile("outpuData.json",JSON.stringify(jsonObj, null, " "));

        });
        //read from file
        /*Transforming data*/
      csvConverter.on("record_parsed", function(jsonObj) {
       // jsonObj.tenantId="Test1342";       
       jsonObj[column]=columnValue;
      return jsonObj;
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