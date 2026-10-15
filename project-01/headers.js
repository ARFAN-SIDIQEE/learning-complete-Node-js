const express = require("express");
const users = require("./mock-users.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

//Middleware -plugin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/users", (req, res) => {
  res.setHeader("X-Content-Type", "application/json");
  // always add X custom headers like X-Content-Type, X-Powered-By, X-Frame-Options, X-XSS-Protection, 
  console.log(req.headers);
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {})
  .delete((req, res) => {});

app.post("/api/users", (req, res) => {
  const body = req.body;

  console.log("BODY:", body);

  const newUser = {
    ...body,
    id: users.users.length,
  };

  users.users.push(newUser);

  fs.writeFile("./mock-users.json", JSON.stringify(users, null, 2), (err) => {
    if (err) {
      return res.status(200).json({
        status: "error",
        message: "Failed to save user",
      });
    }

    return res.status(200).json({
      status: "success",
      user: newUser,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
