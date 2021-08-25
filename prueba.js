//importar libreria de esta ruta
//const argumento=process.argv;
//validate, stats y unique
const argumento =  require('yargs') 
                    .option('s',{
                    alias:'stats',
                    type:'boolean',
                    default:false,
                    })
                    .option('v',{
                    alias:'validate',
                    type:'boolean',
                    default:false,
                    })
                    .argv
//El path módulo proporciona utilidades para trabajar con rutas de archivos y directorios. 
const path = require('path') 
// fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const fs = require('fs');

const fetch = require("node-fetch");
//-----------------------------------

const isAbsolute=(ruta)=>{
    if(path.isAbsolute(ruta))
      //console.log("es una ruta absoluta")
      return ruta
    else
     // console.log("no es una ruta absoluta");
     return path.resolve(ruta)
  }
 //console.log(isAbsolute(argumento._[0]));
  /**
   D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\indextest.js 
   */
//-----------------------
  const checkRutaAndFile=(ruta)=>new Promise((resolve,reject)=>fs.stat(ruta, (err, data) => {
    //voy a verificar si existe o no la ruta
    if (err) {
      reject("rutaNoExiste")
      return
    }
    
    // console.log(data)
    // console.log(err)
    //si es que existe la ruta
    //voy a verificar si es un archivo o carpeta
    if(data.isFile())
    //es un archivo
      resolve([true,ruta])
    else
    //es un directorio
      resolve([false,ruta])
    //console.log(data);
  }))
//--------
const OpenFileMD=(ruta)=>fs.readFile(ruta, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let {links,texts}=buscarLinksAndTexts(data);
  let rutasCheckear=[];
  //true && !false
  if(argumento.stats && !argumento.validate)
  { //mostrar la ruta
    //console.log(ruta);
    let linksSet = new Set(links.map(item=>item));
    console.log("Total", links.length)
    console.log("unique", linksSet.size)   
   //
  }
  else{
  links.forEach((link,index)=>{
      if(argumento.validate)
          rutasCheckear.push(checkruta(ruta,link,texts[index],argumento.stats))
      else
          {
              console.log(ruta,link,texts[index])
             
          }
  })

  if(argumento.validate) 
  Promise.all(rutasCheckear)
      .then(res => {
          if(argumento.stats) {
              console.log(ruta)
              let linksSet = new Set(links.map(item=>item));
              console.log("Total", links.length)
              console.log("unique", linksSet.size) 
              //metodo reduce: ejecuta una funcion reductora sobre cada elemento de un array, y acumular el resultado en un valor de salida             
              const total = res.reduce((p, c) => p + c);
              console.log("Broken:",total)
          }
         })
      .catch(err => console.log(err))
      }
  //console.log(texts)
  //console.log(links)
})

  //----------------------
  // 
  const checkruta=(ruta, link,text,stats)=>new Promise((resolve,reject)=>fetch(link)
  .then(res=>{
      if(!stats)
      //? condicion y : else
            {console.log(ruta,link,text,res.status==404?"fail 404":"ok "+ 200)
            resolve(0)
        }
        else if(res.status==404)
                resolve(1)
            else resolve(0)})
  .catch(error=>{
    if(!stats)    
    {
        console.log(ruta,link,text, "fail 404")
        resolve(0)
    }
    else                
        resolve(1)
    }))
//------------------------
//le envio un string y devuelve los links que son http de ese string y tambien los texts
  let buscarLinksAndTexts=(data)=>{
    let posicion= data.indexOf("(http");
    let links=[];
    let texts=[];
    let posfinal=0;
    // y mientras tengas una posición mayor o igual que 0,
    // (recuerda que -1 significa que no lo encontró)
    while (posicion >= 0) {   
        texts.push(data.slice(data.slice(0,posicion-1).lastIndexOf("[")+1,posicion-1))
        posfinal=data.indexOf(")",posicion);
        links.push(data.slice(posicion+1,posfinal)) ;
        // busca la siguiente ocurrencia de la palabra
        posicion = data.indexOf("(http",posicion+1);
    }
    return {links,texts};
  }

//----------------
//lea directorio
  const openDirectory=(ruta)=>fs.readdir(ruta, 'utf8' , (err, data) => {
    if (err) {
      console.error("ruta no existe3")
      return
    }
    if(data.length>0)
      {
        data.forEach((elemento)=>{
       
            checkRutaAndFile(`${ruta}\\${elemento}`)
                .then((res)=>buscarAbrirArchivosMD(res[0],res[1]))  
        }) 
  
      }
      else return
      //console.log(data)
  }) 
  //-----------------------------------------

let buscarAbrirArchivosMD=(isfile,ruta)=>{
    if(isfile){
      //es un archivo md
       //path.extname () devuelve la extensión del path, desde la última aparición del carácter .(punto)  (ejemplo .js , .txt)
        if(path.extname(ruta)===".md")
        //Buscar links
            OpenFileMD(ruta)
            //no hacer nada
        else return
    }
    //abrimos el directorio y vamos a seguir buscando archivos en forma recursiva
    else openDirectory(ruta)
}

//console.log(buscarAbrirArchivosMD(argumento._[0]))
//console.log(checkRutaAndFile(argumento._[0]))
//console.log(isAbsolute(argumento._[0]))
//---------------------

//isAbsolute(argumento._[0])
  checkRutaAndFile(isAbsolute(argumento._[0]))
         .then((res)=>buscarAbrirArchivosMD(res[0],res[1]))
        .catch((error)=>console.log(error))
//--stats argumento.stats es true si no esta es false
//console.log(argumento)
//-------------------------


/**
 * 
 */


//=============================================
        /*   if(path.extname(ruta)===".md")
  OpenFile(ruta)
else return
else        
openDirectory(ruta) */
//console.log( argumento)
 //D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directorioTest\\cosas\\miMD.md

 //OpenFile("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directorioTest\\cosas\\miMD.md")

//El método path.extname () devuelve la extensión de la ruta, desde la última aparición de. carácter (punto) hasta el final de la cadena en la última parte de la ruta.

