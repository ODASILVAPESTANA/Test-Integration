const request   = require("request");
const fs        = require("fs");

var Data = {
    personalJson : '',
    callDataJson() {
        try {
          var data =  JSON.parse(fs.readFileSync('database.properties.json', 'utf8'));
          if (typeof data =='object' && data != null){
            this.personalJson=data;
          }else
             throw new Error ("Fail read json file");
        }catch (err){
          console.log(err);
        }
       // this.personalJson=data;
        /*fs.readFile('database.properties.json',(err,data) => {
          if (err) throw new Error ("Fail read file json") ;
          let personal = JSON.parse(data);
         //console.log(personal);
         callback(null,personal);
        });*/
    },
    getJson() {
       return this.personalJson;
    }
};
//console.log();
/*var objData = Object.create(Data);
console.log(objData.callDataJson());
//console.log(objData);
console.log(objData.getJson());*/

module.exports = Data;
