var fs   = require('fs-extra'),
Converter=require('../server/csvConverter.js');
exports.copyData=function(temp_path,new_location,file_name,fn,mapCol,columnValue,attCol,res){
  var type=[];
  fs.copy(temp_path, new_location + file_name, function(err) {  
        if (err) {
          console.error(err);
        } 
        else {
          // console.log("success!");
          var csvFileName=new_location+file_name;
          var fileStream=fs.createReadStream(csvFileName);
          Converter.converter(fileStream,fn,mapCol,columnValue,attCol,res);
        }
  });
  return type;
}