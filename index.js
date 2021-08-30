//El path módulo proporciona utilidades para trabajar con rutas de archivos y directorios. 
const path = require("path"); 
// fs es el módulo del sistema de archivos Node.js le permite trabajar con el sistema de archivos en su computadora.
const fs = require("fs");
const fetch = require("node-fetch");
//-----------------------------------

let LeerArchivo=(ruta,options)=>new Promise((resolve)=>{
    if(path.extname(ruta)===".md")
    fs.readFile(ruta, "utf8", (err, data) => {
 
      //devuelve {href y text}
      let midata = buscarLinksAndTexts(data);
      midata.file = ruta;
      if (!(options.validate || options.stats))
        resolve(midata);
      else if (!options.validate && options.stats) {
        //transformamos el arreglo en un conjunto para evitar repeticiones
        let linksSet = new Set(midata.href.map(item => item));
        midata.total = midata.href.length;
        midata.unique = linksSet.size;
        resolve(midata);
      }
      else if (options.validate && !options.stats) {
        let rutasCheckear = [];
        midata.href.forEach((href) => rutasCheckear.push(checkruta(href)));
        Promise.all(rutasCheckear)
          .then(res => {
            let status = [];
            let ok = [];

            //console.log(res) res--> la respuesta es 3 links
            //console.log(res)-->[ [ 1, '404' ], [ 0, '200' ], [ 1, '404' ] ]
            res.forEach((oneResponse) => {
              status.push(oneResponse[1]);
              ok.push(oneResponse[0] == 1 ? "fail" : "ok");
            });
            midata.status = status;
            midata.ok = ok;
            resolve(midata);
          });
      }
      else {
        let rutasCheckear = [];
        midata.href.forEach((href) => rutasCheckear.push(checkruta(href)));
        Promise.all(rutasCheckear)
          .then(res => {
            let status = [];
            let ok = [];
            midata.broken = 0;
            res.forEach((oneResponse) => {
              status.push(oneResponse[1]);
              ok.push(oneResponse[0] == 1 ? "fail" : "ok");
              midata.broken += oneResponse[0];
            });
            midata.status = status;
            midata.ok = ok;
             //transformamos el arreglo en un conjunto para evitar repeticiones
            let linksSet = new Set(midata.href.map(item => item));
            midata.total = midata.href.length;
            midata.unique = linksSet.size;
            resolve(midata);
          });         
      }
    });
    else
    {
      let midata = {};
      midata.file = "error";
      resolve(midata);
    }  
  });
  //funcion sincrona
  const isAbsolute=(ruta)=>{
      if(path.isAbsolute(ruta))
        //console.log("es una ruta absoluta")
        return ruta;
      else
       // console.log("no es una ruta absoluta");
       return path.resolve(ruta);
    };
  
    const checkRutaAndFile=(ruta)=>new Promise((resolve,reject)=>fs.stat(ruta, (err, data) => {
      //voy a verificar si existe o no la ruta
      if (err) {
        reject("rutaNoExiste");
        return;
      }
       //si es que existe la ruta
      //voy a verificar si es un archivo o carpeta
      if(data.isFile())
      //es un archivo
        resolve([true,ruta]);
      else
      //es un directorio
        resolve([false,ruta]);
    }));
//funcion sincrona
//busca los archivos de un directorio en forma recursiva
    const getAllFiles = (dirPath, arrayOfFiles)=> {
      let files = fs.readdirSync(dirPath);  
      arrayOfFiles = arrayOfFiles || [];  
      files.forEach((file) =>{
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
          arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
          arrayOfFiles.push(path.join( dirPath, "/", file));
        }
      });  
      
      return arrayOfFiles;
    };
////
const checkruta = (href) => new Promise((resolve) => fetch(href)
.then(res => {     
    res.status == 404 ? resolve([1,"404"])/* facebook.com/dorina*/ : resolve([0,""+res.status]);      
  }    
)
.catch(() => {
  resolve([1,"404"]);//facebooooook
}));
//funcion sincrona
let buscarLinksAndTexts=(data)=>{
    let posicion= data.indexOf("(http");
    let href=[];
    let text=[];
    let posfinal=0;
    // y mientras tengas una posición mayor o igual que 0,
    // (recuerda que -1 significa que no lo encontró)
    while (posicion >= 0) {   
        text.push(data.slice(data.slice(0,posicion-1).lastIndexOf("[")+1,posicion-1));
        posfinal=data.indexOf(")",posicion);
        href.push(data.slice(posicion+1,posfinal)) ;
        // busca la siguiente ocurrencia de la palabra
        posicion = data.indexOf("(http",posicion+1);
    }
    return {href,text};
  };


/* console.log(isAbsolute("D:\\Laboratoria\\dorina\\LIM015-md-links\\directoriotest"))
console.log("otro caso")
console.log(isAbsolute("patolucas")) */


/* checkRutaAndFile("D:\\Laboratoria\\dorina\\LIM015-md-links\\mimd.md")
      .then((res)=>console.log(res))
      .catch((err)=>console.log(err)) */


//recibe una cadena en formato markdown y devuelve los links y los text en un objeto
/* console.log(buscarLinksAndTexts(`#este es una prueba
#dentro de text de texto dentro de
[Noode.js](https://nodeeeejs.org/es/)

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

[Noode.js](https://nodeeeejs.org/es/)`)) */

//ojo
//------
//validate false y stats false


/* LeerArchivo("D:\\Laboratoria\\dorina\\LIM015-md-links\\mimd.md",{validate:false,stats:false})
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err)) */
//----
  //validate false y stats true
/* LeerArchivo("D:\\Laboratoria\\dorina\\LIM015-md-links\\mimd.md",{validate:false,stats:true})
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err)) */

    //validate true y stats false
/* LeerArchivo("D:\\Laboratoria\\dorina\\LIM015-md-links\\mimd.md",{validate:true,stats:false})
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err)) */

      //validate true y stats true
/* LeerArchivo("D:\\Laboratoria\\dorina\\LIM015-md-links\\mimd.md",{validate:true,stats:true})
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err)) */

/*   LeerArchivo("D:\\Laboratoria\\dorina\\LIM015-md-links\\patolucas.md",{validate:true,stats:true})
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err)) */

/*     LeerArchivo("D:\\Laboratoria\\dorina\\LIM015-md-links\\mimd.md",{validate:true,stats:false})
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err)) */

/*       LeerArchivo("D:\\Laboratoria\\dorina\\LIM015-md-links\\api.js",{validate:true,stats:false})
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err)) */

/* checkruta("https://facebooooookkkkk.com//manzana//naranja")
  .then((res)=>console.log(res)) */

 /*  checkruta("https://google.com")
  .then((res)=>console.log(res)) */

/*     checkruta("https://www.google.com/dorina/dora")
  .then((res)=>console.log(res))  */

//console.log(getAllFiles("D:\\Laboratoria\\dorina\\LIM015-md-links\\directoriotest"))
////


    module.exports = {
        LeerArchivo, 
        checkruta,
        isAbsolute, //
        checkRutaAndFile,
        buscarLinksAndTexts, //
        getAllFiles,//
    }; 