class DataAccessor{
     //over enginereed to see how inheritance works in ts 
     FileName:string = "";
     constructor(fileName:string="db.json") {   
          this.FileName = fileName;  
       }   
}
export default DataAccessor;