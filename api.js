const {
  LeerArchivo, 
  isAbsolute, 
  checkRutaAndFile,
  getAllFiles,
} = require("./index.js");

const path = require("path") ;
const mdLinks = (path1, options) => new Promise((resolve, reject) => {
  checkRutaAndFile(isAbsolute(path1))
    .then((res) => {
      if (res[0])
      {   
        if (path.extname(res[1]) === ".md") {
          LeerArchivo(res[1], options)
            .then((res) => {
              let data = [];
              data.push(res);
              resolve(data);
            });
            
        }
        else reject("No es un archivo md");
      }
      else {
        let files = getAllFiles(res[1]);
        let OpenFiles = [];
        files.forEach((file) => OpenFiles.push(LeerArchivo(file, options)));
        Promise.all(OpenFiles)
          .then(res => {
           /*  console.log(res);
            console.log("////////////////////////////////////////") */
            let data = res.filter((val) => val.file != "error");
            resolve(data);
          });
               
      }
    })
    .catch((error) => reject(error));
});

/* mdLinks("directoriotest",{validate:false, stats:false})
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error)) */

/* mdLinks("D:\\Laboratoria\\dorina\\LIM015-md-links\\mimd.md",{validate:false, stats:false})
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error)) */
/* mdLinks("D:\\Laboratoria\\dorina\\LIM015-md-links\\index.js",{validate:false, stats:false})
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error)) */
/*  mdLinks("D:\\Laboratoria\\dorina\\LIM015-md-links\\patolucas",{validate:false, stats:false})
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error))  */


module.exports = mdLinks;