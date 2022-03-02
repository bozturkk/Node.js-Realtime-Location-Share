
const express = require('express');
const { Session } = require('inspector');
const { SocketAddress } = require('net');
const { listeners, disconnect } = require('process');
const { EventEmitter } = require('stream');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views','./views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
///////////////////////////////////////////


app.get('/', (req,res)=>{ 
    res.render('index');
})

app.post('/map',(req,res)=>{
    var pos_x = req.body.pos_x;
    res.render('map',{p_x:pos_x});
    
})
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(8080)
const location =[];
const players ={}
io.on('connection',(socket)=>{
    socket.on('Client_send_pos',(data)=>{ /* position verisi alınır. */
        console.log("new client connected, with id " + socket.id);
        location.push(data); /* location dizine aktarılır.*/
        io.emit('send_mang_pos',location); /* emit edilerek yazdırılması sağlanır. */
        
        });

        socket.on("disconnect",() => {
            console.log(`${data} User disconnected.`)
            const index = location.indexOf(data); /* disconnect olan browser'ın dizide kaçıncı eleman olduğu bulu. */
            if (index != -1) {
                delete location[index];
                location.splice(index, 1);
                io.emit('delete',index);
                console.log(index);
            }
            io.emit('send_mang_pos',location);
    });
    
});


