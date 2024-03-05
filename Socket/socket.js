import { Server } from "socket.io";

const io = new Server({ 
    cors:{
        origin: "http://127.0.0.1:5173"
    }
 });

io.on("connection", (socket) => {
  console.log("someone has loged in!!!")
  socket.on("disconnect", ()=>{
    console.log("someone has left");
  })
});

io.listen(5000);