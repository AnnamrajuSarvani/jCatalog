 var Attribute = require('../model/schema1.js').Schema1; 
 var Attribute2 = require('../model/schema2.js').Schema2; 
 var Attribute3 = require('../model/schema3.js').Schema3; 
 var Attribute4 = require('../model/schema4.js').Schema4; 
  var Attribute5 = require('../model/schema5.js').Schema5; 
 var Attribute=require('../model/ProductSchema.js').productSchema;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Db1');
/** @module Controller for Attribute */

/** get all attribute details */
exports.GetAll = function() {     
    Attribute.find({}, function(err, attribute) {
        if (!err) {
             return attribute;           
        } else {
            return err; // 500 error
        }
    });
};

exports.save = function(data,gtype){
switch(gtype) {
	case "1":
		save1(data);
		break;
	case "2":
		save2(data);
		break;
	case "3":
		save3(data);
		break;
	case "4":
		save4(data);
		break;
	case "5":
		save5(data);
		break;
	default:
		break;
}
}
/** For Product Group Schema1*/
 save1=function(data){      
   var attribute = new Attribute;
    attribute.obj=data;
    attribute.save(function(err, result) {
        if (!err) {
           console.log(result);
        } else {
             reply(err); // HTTP 403
            // console.log(err);
        }
    });
};

/*Price Group for schema2*/

save2=function(data){  
    console.log(data);
   var attribute = new Attribute2;
    attribute.dataF=data;        
    attribute.save(function(err, result) {
        if (!err) {
           console.log(result.dataF);
        } else {
            reply(err); // HTTP 403
            // console.log(err);
        }
    });
};
/*This for schema3 Price Types*/
save3=function(data) {  
    console.log(data);
   var attribute = new Attribute3;
    attribute.dataP=data;        
    attribute.save(function(err, result) {
        if (!err) {
           console.log(result.dataF);
        } else {
            reply(err); // HTTP 403
            // console.log(err);
        }
    });
};

/*Schema4*/
save4=function(data){ 
	// console.log(data);
   var attribute = new Attribute4;
    attribute.dataD=data;       
    // for(j in data) {
    // 	console.log(data[j].attributes);
    // }
    attribute.save(function(err, result) {
        if (!err) {
              // console.log(result.dataD);
        } else {
            reply(err); 
        }
    });
};
/*Schema5*/
save5=function(data) { 
	// console.log(data);
   var attribute = new Attribute5;
    attribute.dataA=data;       
    // for(j in data) {
    // 	console.log(data[j].attributes);
    // }
    attribute.save(function(err, result) {
        if (!err) {
              // console.log(result.dataA);
        } else {
            reply(err); 
        }
    });
};
