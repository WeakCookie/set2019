class errorHandler {
    constructor(e) {
      this.error=e;
    }
    specifyError(){
      
       return this.error.constructor.name
    }
    createErrorMessage() {
      
      return this.error.message
    }
 } 
 //test
 try {
   var foo = undefined;
   foo.substring(1);
 }
 catch(e)
 {
     var err=new errorHandler(e)
     console.log("specify:", err.specifyError())
     console.log("message:", err.createErrorMessage())
 }