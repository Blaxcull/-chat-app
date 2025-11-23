const ws = new WebSocket('ws://localhost:6969');


const clientName = document.querySelector('#client-name');
const createRoomButton = document.querySelector('#create-room-button');

const roomName = document.querySelector('#room-name');
const joinRoomButton = document.querySelector('#join-room-button');





ws.onopen = () => {
    console.log('Connection opened!');
}


ws.onmessage = ({ data }) =>{ 
    console.log(data) 

    createRoomButton.addEventListener('click', () => {
        console.log(clientName.value);
        ws.send(JSON.stringify( {name: clientName.value, type : 'createRoom'}));
        clientName.value = '';
    });

    joinRoomButton.addEventListener('click', () => {
        console.log(roomName.value);
        ws.send(JSON.stringify( {roomName: roomName.value,name: clientName.value , type : 'joinRoom'}));
        roomName.value = '';
    });

}




ws.onerror = function(error) {
    console.log('Error:', error);
}





ws.onclose = function() {
    ws = null;
}
