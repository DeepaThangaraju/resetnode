import express from "express";
const app=express();
const PORT=9000;
function createConnection(){
    
}
app.get("/",(request,response)=>response.send("Hello world!!!"));
app.get("/users",(request,response)=>{
    
})
app.listen(PORT,()=>console.log("connected in",PORT));