import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchChatAiResponse, addUserMessage, addLoadingMessage} from '../../store/chatAiSlice';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);

  const sendMessage = () => {
    if (!input.trim()) return;
    console.log(input)
    dispatch(addUserMessage(input));
    dispatch(addLoadingMessage());
    dispatch(fetchChatAiResponse(input));

    setInput('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Chat with ChatenAI</h2>
      <div style={{ height: '400px', overflowY: 'auto', background: '#f9f9f9', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            {msg.author && (
              <div style={{ textAlign: 'right' }}>
                <strong>{msg.title}:</strong> {msg.desc}
              </div>
            )}
            {msg.content?.map((ai, idx) => (
              <div key={idx} style={{ textAlign: 'left' }}>
                <img src={ai.aiImg} alt="AI Avatar" width="30" /> <strong>{ai.title}</strong> ({ai.badge})
                <p>{ai.text || ai.desc}</p>
                {ai.img && <img src={ai.img} alt="Loader" width="30" />}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px' }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
