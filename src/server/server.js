let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

let jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;
let users = {};
let userTokens = [];


io.on('connection', (socket) => {

    socket.on('getUsersList',(token)=>{
        if(token && users[token]){
            socket.emit('usersList', users);
        }
    })
    socket.on('sendText',(textObj)=>{
        if(users && users[textObj.to]){
            let socketId = users[textObj.to].socketId;
            console.log("-------->>",socketId)
            io.to(socketId).emit('getText',textObj);
        }

    })
    socket.on('createUser', (user) => {
        if(user && user.token && users[user.token]){
            delete users[user.token];
        }
        delete user['token'];
        token = jwt.sign(user, 'xxxx')
        userTokens.push(token);
        users[token] = users[token] || {};
        users[token].isCreated = true;
        users[token].socketId = socket.id;
        users[token].isActive = true;
        users[token].flag = user.flag;
        users[token].name = user.firstName + ' ' + user.lastName;
        socket.broadcast.emit('usersList', users);
        socket.emit('userCreated', token)
    })
    socket.on('fetchUser', (token) => {
        let index = userTokens.indexOf(token);
        let user;
        if (index > -1) {
            user = jwt.decode(token, 'xxxx')
        }
        socket.emit('getUser', user)
    })
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});