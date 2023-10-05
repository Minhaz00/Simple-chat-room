import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
const socket = io.connect('http://localhost:3001')

function App() {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinroom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? 
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          
          <input
            type="text"
            placeholder='Enter name'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
          <br />
          <input
            type="text"
            placeholder='Enter room id'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          ></input>
          <br />
          <button onClick={joinroom}>Join room</button>
        </div>

        :

        <Chat
          socket={socket}
          username={username}
          room={room}
        ></Chat>    
      }</div>
  );
}

export default App;
