const fs = require("fs");
// sync write file
//fs.writeFileSync("./test.txt", "Hello, World!");

// async write file
//fs.writeFile("./test.txt", "Hello, World! async", (err) => {});

// sync read file
//for single line
//const result = fs.readFileSync("./contacts.txt", "utf-8");
//console.log(result);

// for array of lines
//const result2 = fs.readFileSync("./contacts.txt", "utf-8").split("\n");
//console.log(result2);

//const result = fs.readFileSync("./contacts.txt", "utf-8");
//const firstContact = result.split("\n")[0];
//console.log(firstContact);

// async read file
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
