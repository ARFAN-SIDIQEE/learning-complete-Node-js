const express = require('express');
const users = require("./mock-users.json");

const app = express();

const PORT = 8000;

app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.users.map((user) => `<li>${user.username}</li>`).join("")}
        </ul>
    `;

    res.send(html);
});

app.get("/api/users/:id", (req, res) => {
    const id =Number(req.params.id);
    const user = users.users.find((user) => user.id === id);
    res.json(user);
})

// Routes
app.get('/api/users', (req, res) => {
    res.json(users.users);
})



app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});