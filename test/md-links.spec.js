const mdLinks = require("../api.js");
const {
  LeerArchivo, 
  checkruta,
  isAbsolute, //
  checkRutaAndFile,
  buscarLinksAndTexts, //
  getAllFiles,//
} = require("../index.js");

describe('mdLinks', () => {


  it('should...', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('recibe un directorio y retorna un array de objetos', () => {
    expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
    return mdLinks("directoriotest",{validate:false, stats:false})
        .then((res) => {
              expect(res).toContain([
                {
                  href: [
                    'https://nodeeeejs.org/es/',
                    'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
                    'https://nodeeeejs.org/es/'
                  ],
                  text: [ 'Noode.js', 'md-links', 'Noode.js' ],
                  file: 'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest\\cosas\\miMD.md'
                },
                {
                  href: [ 'https://google.com/' ],
                  text: [ 'Nodee.js' ],
                  file: 'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest\\miread.md'
                }
              ]);
        }).catch((error) => {
          // expect(error).toBe('invalido');
        });
  });

  it('recibe un archivo y retorna un array de objetos', () => {
    expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
    return mdLinks("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md",{validate:false, stats:false})
        .then((res) => {
              expect(res).toContain([
                {
                  href: [
                    'https://nodeeeejs.org/es/',
                    'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
                    'https://nodeeeejs.org/es/'
                  ],
                  text: [ 'Noode.js', 'md-links', 'Noode.js' ],
                  file: 'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md'
                }
              ]);
        }).catch((error) => {
          // expect(error).toBe('invalido');
        });
  });

  it('recibe un archivo de extension diferente a md y devuelve un objeto con file error', () => {
    expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
    return mdLinks("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\index.js",{validate:false, stats:false})
        .then((res) => {
              //expect(res).toContain();
        }).catch((error) => {
           expect(error).toBe('No es un archivo md');
        });
  });

  it('recibe un archivo de extension diferente a md y devuelve un objeto con file error', () => {
    expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
    return mdLinks("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\patolucas",{validate:false, stats:false})
        .then((res) => {
              //expect(res).toContain();
        }).catch((error) => {
           expect(error).toBe('rutaNoExiste');
        });
  });
///
  describe('buscarLinksAndTexts', () => {

    it('should be a function', () => {
      expect(typeof buscarLinksAndTexts).toBe('function');
    });
    it(`Recibe un string en formato markdown y devuelve un objeto
    con los links del string en un arreglo en la clave href y los text en
    la clave text`, () => {
      expect(buscarLinksAndTexts(`#este es una prueba
      #dentro de text de texto dentro de
      [Noode.js](https://nodeeeejs.org/es/)
      
      ![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)
      
      [Noode.js](https://nodeeeejs.org/es/)`)).toStrictEqual({
        href: [
          'https://nodeeeejs.org/es/',
          'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
          'https://nodeeeejs.org/es/'
        ],
        text: [ 'Noode.js', 'md-links', 'Noode.js' ]
      });
    });

    it(`Recibe un string en formato markdown y devuelve un objeto
    con los links del string en un arreglo en la clave href y los text en
    la clave text`, () => {
      expect(typeof buscarLinksAndTexts(`#este es una prueba
      #dentro de text de texto dentro de
      [Noode.js](https://nodeeeejs.org/es/)
      
      ![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)
      
      [Noode.js](https://nodeeeejs.org/es/)`)).toStrictEqual('object');
    });
  
  });
 
////
  describe('isAbsolute', () => {

    it('should be a function', () => {
      expect(typeof isAbsolute).toBe('function');
    });
    it(`Recibe una ruta absoluta y devuelve la misma ruta absoluta`, () => {
      expect(isAbsolute("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest"))
                    .toStrictEqual('D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest');
    });
    it(`Recibe una ruta relativa y devuelve una ruta absoluta`, () => {
      expect(isAbsolute("directoriotest"))
                    .toStrictEqual('D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest');
    });
  
  });

////
  describe('getAllFiles', () => {

    it('should be a function', () => {
      expect(typeof getAllFiles).toBe('function');
    });
    it(`Recibe un string de una ruta absoluta de un directorio y devuelve un arreglo con las rutas
    de todos los archivos dentro de ese directorio`, () => {
      expect(getAllFiles("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest"))
                    .toStrictEqual([
                      'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest\\animales\\aves\\PATO.txt',
                      'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest\\animales\\aves\\PAVO.txt',
                      'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest\\cosas\\miMD.md',
                      "D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest\\cosas\\tecnologia\\sinlink.md",
                      'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest\\example.js',
                      'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest\\miread.md',
                      'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest\\piedra.txt'
                    ]);
    });

    it(`Recibe un string de una ruta absoluta de un directorio y devuelve un arreglo con las rutas
    de todos los archivos dentro de ese directorio`, () => {
      expect(typeof getAllFiles("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest"))
                    .toStrictEqual("object");
    });
  
  });
//////
  describe('checkRutaAndFile', () => {

    it('Recibe una ruta invalida y nos devuelve que la rutanoxiste', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return checkRutaAndFile("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\patolucas")
          .then((res) => {
              
          }).catch((error) => {
              expect(error).toBe('rutaNoExiste');
          });
    });

    it('Recibe una ruta de directorio y nos devuelve un arreglo que contiene false', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return checkRutaAndFile("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest")
          .then((res) => {
               expect(res).toContain([ false, 'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest' ]);
          }).catch((error) => {
             // expect(error).toBe('rutaNoExiste');
          });
    });

    it('Recibe una ruta de archivo y nos devuelve un arreglo con true', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return checkRutaAndFile("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md")
          .then((res) => {
               expect(res).toContain([ true, 'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\directoriotest' ]);
          }).catch((error) => {
             // expect(error).toBe('rutaNoExiste');
          });
    });

  });
  //////

  describe('checkruta', () => {

    it('Recibe un link que existe y devuelve un arreglo con los valores 0 y 200', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return checkruta("https://google.com")
          .then((res) => {
               expect(res).toContain([ 0, '200' ]);
          }).catch((error) => {
             // expect(error).toBe('rutaNoExiste');
          });
    });

    it('Recibe un link que no existe y devuelve un arreglo con los valores 1 y 404', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return checkruta("https://goooooogleeeee.com")
          .then((res) => {
               expect(res).toContain([ 1, '404' ]);
          }).catch((error) => {
             // expect(error).toBe('rutaNoExiste');
          });
    });

    it('Recibe un link con un subdominio que no existe y devuelve un arreglo con los valores 1 y 404', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return checkruta("https://www.google.com/dorina/dora")
          .then((res) => {
               expect(res).toContain([ 1, '404' ]);
          }).catch((error) => {
             // expect(error).toBe('rutaNoExiste');
          });
    });

  });
  
  describe('LeerArchivo', () => {

    it('recibe una ruta de un archivo md y con stats y validate true y devuelve href text y file ', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return LeerArchivo("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md",{validate:false,stats:false})
          .then((res) => {
               expect(res).toContain({
                href: [
                  'https://nodeeeejs.org/es/',
                  'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
                  'https://nodeeeejs.org/es/'
                ],
                text: [ 'Noode.js', 'md-links', 'Noode.js' ],
                file: 'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md'
              });
          }).catch((error) => {
             // expect(error).toBe('rutaNoExiste');
          });
    });

    it('recibe una ruta de un archivo md y con validate false stats true y devuelve href text, file, total y unique ', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return LeerArchivo("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md",{validate:false,stats:true})
          .then((res) => {
               expect(res).toContain({
                href: [
                  'https://nodeeeejs.org/es/',
                  'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
                  'https://nodeeeejs.org/es/'
                ],
                text: [ 'Noode.js', 'md-links', 'Noode.js' ],
                file: 'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md',
                total: 3,
                unique: 2
              });
          }).catch((error) => {
             // expect(error).toBe('rutaNoExiste');
          });
    });

    it('recibe una ruta de un archivo md y con validate true y stats false y devuelve href text file status y ok ', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return LeerArchivo("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md",{validate:true,stats:false})
          .then((res) => {
               expect(res).toContain({
                href: [
                  'https://nodeeeejs.org/es/',
                  'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
                  'https://nodeeeejs.org/es/'
                ],
                text: [ 'Noode.js', 'md-links', 'Noode.js' ],
                file: 'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md',
                status: [ '404', '200', '404' ],
                ok: [ 'fail', 'ok', 'fail' ]
              });
          }).catch((error) => {
             // expect(error).toBe('rutaNoExiste');
          });
    });

    it('recibe una ruta de un archivo md y con validate true y stats false y devuelve href text file status broken y ok', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return LeerArchivo("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md",{validate:true,stats:true})
          .then((res) => {
               expect(res).toContain({
                href: [
                  'https://nodeeeejs.org/es/',
                  'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
                  'https://nodeeeejs.org/es/'
                ],
                text: [ 'Noode.js', 'md-links', 'Noode.js' ],
                file: 'D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\mimd.md',
                broken: 2,
                status: [ '404', '200', '404' ],
                ok: [ 'fail', 'ok', 'fail' ],
                total: 3,
                unique: 2
              });
          }).catch((error) => {
             // expect(error).toBe('rutaNoExiste');
          });
    });


    it('recibe un archivo de extension diferente a md y devuelve un objeto con file error', () => {
      expect.assertions(1); //el número indica la cantidad de expects que tienes en tu test
      return LeerArchivo("D:\\Laboratoria\\proyecto_lab3\\LIM015-md-links\\cli.js",{validate:true,stats:true})
          .then((res) => {
                expect(res).toContain({ file: 'error' });
          }).catch((error) => {
            // expect(error).toBe('invalido');
          });
    });

  }); 

});





