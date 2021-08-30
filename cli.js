#!/usr/bin/env node
const mdLinks = require("./api.js");
///// Con Yarg
/* const argumento =  require('yargs') 
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
let options={};
options.stats = argumento.stats
options.validate = argumento.validate 
let path=argumento._[0] */
//ejemp  _: ['mimd.md'] posicion es 0 
///Con Process
let argumento= process.argv;
let options={};
options.stats = process.argv.includes("--stats");
options.validate = process.argv.includes("--validate");
let path=argumento[2];
/////
//console.log(options)
//console.log(argumento)
if(!(options.stats||options.validate))
    mdLinks(path,options)
      .then((links) => {
       // console.log(links);
        // => [{ href, text, file }, ...]
        links.forEach((link)=>link.href.forEach((href,index)=>{
          console.log(link.file, href, link.text[index]);
        }));
        //////
      //console.log(links)

      })
      .catch((error)=>console.log(error));
else if(!options.validate && options.stats)
{
  mdLinks(path,options)
  .then((links) => {
    let Total=0;
    let unique=0;
    links.forEach((link)=>{
      Total+=link.total;
      unique+=link.unique;
    });
    console.log("Total", Total);
    console.log("unique", unique);
//////
  // console.log(links)
  })
  .catch(console.error);
}
else if(options.validate && !options.stats)
{
  mdLinks(path,options)
  .then((links) => {
    links.forEach((link)=>link.href.forEach((href,index)=>{
      console.log(link.file, href, link.text[index], link.status[index],link.ok[index]);
    }));
    ///
    //console.log(links)
  })
  .catch(console.error);
}
else{
  mdLinks(path,options)
  .then((links) => {
    let Total=0;
    let unique=0;
    let broken=0;
    links.forEach((link)=>{
      Total+=link.total;
      unique+=link.unique;
      broken+=link.broken;
    });
    console.log("Total", Total);
    console.log("unique", unique);
    console.log("broken", broken);

    ///
    //console.log(links)
  })
  .catch(console.error); 
}