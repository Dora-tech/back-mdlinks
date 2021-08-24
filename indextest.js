const path = require('path')
//extrae
const argumento = require('yargs').argv
const fs = require('fs');
console.log( argumento);

const https = require('https');

 const checkruta=(ruta, link)=>fetch(link)
 .then(res=>console.log(ruta,link,res.status,"ok 200"))
 .catch(error=>(error))
 checkmiruta("c:\\loquesea\\",argument._[0]);
/**
 * let checkruta=(ruta,link)=>https.get(link, function(res) {
  return console.log(ruta,link,res.statusCode,"ok 200");
  console.log("statusCode: ", res.statusCode);   
}).on('error', function(e) {
  return console.log(ruta,link, "fail 404");
});
 */
// Funcion para determinar si la ruta es absoluta y convertir rutas relativas a absolutas
/**
 * 
 * const itsAbsolute = (route) => {
  if (path.isAbsolute(route) === true) {
    return route;
  } return (path.resolve(route));
};
console.log(itsAbsolute);
 */

function isAbsolute(ruta){
  if(path.isAbsolute(ruta))
    //console.log("es una ruta absoluta")
    return ruta
  else
   // console.log("no es una ruta absoluta");
   return path.resolve(ruta)
}
//---------------------------------------
const OpenFile=(ruta)=>fs.readFile(ruta, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let midata=data;
  let posicion= data.indexOf("(http");
  let links=[];
  let posfinal=0;
  // y mientras tengas una posición mayor o igual que 0,
  // (recuerda que -1 significa que no lo encontró)
  while (posicion >= 0) {      
      
      posfinal=data.indexOf(")",posicion);
      links.push(data.slice(posicion+1,posfinal)) ;
      // busca la siguiente ocurrencia de la palabra
      posicion = data.indexOf("(http",posicion+1);
  }
 // console.log(links)
  links.forEach((link)=>checkruta(ruta,link))
  console.log(links.length)
//  console.log(midata)
}) 

//------------------------
const checkFile=(ruta)=>fs.stat(ruta, (err, data) => {
  if (err) {
    console.error("ruta no existe1")
    return
  }
  if(data.isFile())
    if(path.extname(ruta)===".md")
      OpenFile(ruta)
    else return
  else
    openDirectory(ruta)
  //console.log(data);
})
//----------------------
const openDirectory=(ruta)=>fs.readdir(ruta, 'utf8' , (err, data) => {
  if (err) {
    console.error("ruta no existe3")
    return
  }
  if(data.length>0)
    {
      data.forEach((elemento)=>{
       // console.log(`${ruta}\\${elemento}`);
        checkFile(`${ruta}\\${elemento}`)})    

    }
    else return
   // console.log(data)
}) 
checkFile((isAbsolute(argumento._[0])));

//-----------------
//console.log(path.extname(isAbsolute(argumento._[0]))) 