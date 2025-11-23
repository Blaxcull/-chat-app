import { WebSocketServer } from 'ws';
import { parse, v4 } from 'uuid';

const wss = new WebSocketServer({ port: 6969});



const Rooms = new Map()


wss.on('connection', function connection(ws) {

    const UUID = v4()
    const roomId= generateRandomString() 

    const person = {id: UUID}

    Rooms.set(roomId,[UUID])
    
    ws.on('error', console.error);
    console.log('connected');

    ws.on('message', function message(data) {

        const parsedData = JSON.parse(data)

        console.log(parsedData.type)

        if (parsedData.type === 'createRoom') {

            person.roomId = roomId
            person.name = parsedData.name

            console.log(person)


        }

        // match the room with existing rooms
        // if the room exist make a set of uuid belonging to the 
        // room id 
        
        if (parsedData.type === 'joinRoom') {


            const room = Rooms.get(parsedData.roomName)

            room.push(4);

            person.name = parsedData.name
            person.roomId = parsedData.roomName

            console.log(person)

        }


    });

    ws.send('something');
});





function generateRandomString() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}
