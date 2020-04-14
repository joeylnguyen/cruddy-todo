const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

// creates new file for a todo with a unique id as filename
// the contents of the file should only be the todo text
// on a successful create, pass a todo object to the callback
exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.writeFile(path.join(exports.dataDir, id + '.txt'), text, (err) => {
      if (err) {
        throw ('error creating file');
      } else {
        callback(null, {id, text});
      }
    });
  });
};

// console.log(id);
// items[id] = text;
// fs.writeFile(id + '.txt', text, (err) => {
//   if (err) {
//     throw ('error creating file');
//   } else {
//     callback(null, {id, text});
//   }
// });
// callback(null, { id, text });

// instead of {00001: 'do stuff'}. it will be {text: 'do stuff'} Filename 00001.txt => 'do stuff' {text: 'do stuff'}
// fs.writefile(filename = id, data = text, callback = () => ({text: text}))
/* fs.writeFile(file, data, callback)
- file: filename
- data: string or a buffer
- callback (err)
*/




// returns all the todo lists data in an array of objects
// returns an empty array if there are no todos
exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

/* use fs.readdir(path[,options], callback)
- reads the content of a directory - callback takes in (err, files)
- files is an array of the names of the files in directory*/

// Looks up a todo item by ID
// On success, it invoke a callback with the todo data
exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

/* fs.readFile(path[,options], callback)
callback takes in (err, data)
data - is the contents of the file
*/

// Look up a todo item by ID
// Update todo with new values
// Do not change ID... possibly use readOne here?
exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

// Look up a todo item by ID
// delete that todo item
// does not change counter
// should return an error for non-existant id
exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

/* fs.unlinke(path, callback)
- path
- callback (err)

*/




// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
