import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {

    const [currMsg, setCurrMsg] = useState('');
    const [msgList, setMsgList] = useState([]);

    const sendMsg = async () => {
        if (currMsg !== '') {
            const msgData = {
                room: room,
                author: username,
                msg: currMsg,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            };
            await socket.emit('send_msg', msgData);
            setMsgList((list) => [...list, msgData]);
            setCurrMsg('');
        }
    }

    useEffect(() => {
        socket.on('received_msg', (data) => {
            setMsgList((list)=> [...list, data]);
        })
    }, [socket]);

    return (
        <div className='chat-window'>
            <div className="chat-header">
                <h3>Live chat</h3>
            </div>

            <div className="chat-body">
                <ScrollToBottom className='message-container'>
                    {
                        msgList?.map(m => {
                            return (
                                <div
                                    className="message"
                                    id={username === m.author ? 'you' : 'other'}>
                                    <div>
                                        <div className='message-content'>
                                            <p>{m.msg}</p>
                                        </div>
                                        <div className='message-meta'>
                                            <p id='time'>{m.time}</p>
                                            <p id='author'>{m.author}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ScrollToBottom>
            </div>

            <div className="chat-footer">
                <input
                    type="text"
                    value={currMsg}
                    placeholder='Write message'
                    onChange={(event) => {
                        setCurrMsg(event.target.value);
                    }}
                    onKeyPress ={(event) => {
                        event.key === "Enter" && sendMsg();
                    }}
                />
                <button onClick={sendMsg}>➤</button>
            </div>
        </div>
    );
};

export default Chat;