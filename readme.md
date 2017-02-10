Example:

var fs = new mfs({
  typeOfStorage: window.PERSISTENT,
  requestedQuota: 100
});

fs.saveFile('hola.txt', 'jijiji', 'text/plain').done(function(){console.log('done save file', arguments);}).fail(function(){console.log('failed', arguments)});

fs.readFile('hola.txt', 'text').done(function(){console.log('done read file', arguments)}).fail(function(){console.log('failed', arguments)});

fs.deleteFile('hola.txt').done(function(){console.log('done delete file', arguments)}).fail(function(){console.log('failed', arguments)});
