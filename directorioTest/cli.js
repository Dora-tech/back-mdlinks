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
      resolve([true,ruta])
    else
      resolve([false,ruta])
    //console.log(data);
  }))

//-------------------------------
  let cuentaBroken=0;

  const OpenFileMD=(ruta)=>fs.readFile(ruta, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    let {links,texts}=buscarLinksAndTexts(data);
    let rutasCheckear=[];
    if(argumento.stats && !argumento.validate) console.log("Total", links.length)
    else{
    links.forEach((link,index)=>{
        if(argumento.validate)
            rutasCheckear.push(checkruta(ruta,link,texts[index]))
        else
            {
                console.log(ruta,link,texts[index])
               
            }
    })
    let cuentarutas=0;   
    if(argumento.validate) 
    Promise.all(rutasCheckear)
        .then(res => {
            if(argumento.stats) {
                console.log("Total:",links.length)
               
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
  const checkruta=(ruta, link,text)=>new Promise((resolve,reject)=>fetch(link)
  .then(res=>{
      if(!argumento.stats)
      //? condicion y : else
            {console.log(ruta,link,text,res.status==404?"fail 404":"ok "+ 200)
            resolve(0)
        }
        else if(res.status==404)
                resolve(1)
            else resolve(0)})
  .catch(error=>{
    if(!argumento.stats)  
        
    {
        console.log(ruta,link,text, "fail 404")
        resolve(0)
    }
    else                
                    resolve(1)
                    }))
//------------------------
  let buscarLinksAndTexts=(data)=>{
    let posicion= data.indexOf("(http");
    let links=[];
    let texts=[];
    let posfinal=0;
    // y mientras tengas una posición mayor o igual que 0,
    // (recuerda que -1 significa que no lo encontró)
    while (posicion >= 0) {   
        texts.push(data.slice(data.substring(0,posicion-1).lastIndexOf("[")+1,posicion-1))
        posfinal=data.indexOf(")",posicion);
        links.push(data.slice(posicion+1,posfinal)) ;
        // busca la siguiente ocurrencia de la palabra
        posicion = data.indexOf("(http",posicion+1);
    }
    return {links,texts};
  }

//----------------

  const openDirectory=(ruta)=>fs.readdir(ruta, 'utf8' , (err, data) => {
    if (err) {
      console.error("ruta no existe3")
      return
    }
    if(data.length>0)
      {
        data.forEach((elemento)=>{
       
            checkRutaAndFile(`${ruta}\\${elemento}`).then((res)=>buscarAbrirArchivosMD(res[0],res[1]))  
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
  checkRutaAndFile(isAbsolute(argumento._[0]))
        .then((res)=>buscarAbrirArchivosMD(res[0],res[1]))
       .catch((error)=>console.log(error))