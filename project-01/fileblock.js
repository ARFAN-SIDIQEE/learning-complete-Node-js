//console.log("hey there ! I am JS");

//Blocking...
//const fs = require("fs");
//const result = fs.readFileSync("contacts.txt", "utf-8");
//const firstContact = result.split("\n")[0];
//console.log(firstContact);

//console.log("Program Ended !");

// Non-Blocking...
//const fs = require("fs");
//console.log("Program Started !");
//fs.readFile("contacts.txt", "utf-8", (err, result) => {
//  if (err) {
//    console.log(err);
//  } else {
//    console.log(result);
//  }
//});
//console.log("Program Ended !");
//console.log("hey there ! I am JS");
//console.log("Program Started !");

const os = require("os");
console.log(os.userInfo());
console.log(os.cpus().length);
console.log(os.freemem());
console.log(os.totalmem());
console.log(os.homedir());
console.log(os.hostname());
console.log(os.platform());
console.log(os.release());
console.log(os.type());
console.log(os.uptime());
console.log(os.arch());
console.log(os.networkInterfaces());
console.log(os.endianness());
console.log(os.constants);
console.log(os.tmpdir());
console.log(os.loadavg());
console.log(os.version());
console.log(os.EOL);
console.log(os.getPriority());
