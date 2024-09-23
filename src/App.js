import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchIndianRecipes } from './edamamApiService';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Welcome message when the component mounts
  useEffect(() => {
    const welcomeMessage = {
      sender: 'bot',
      text: "👋 Well, well, well! Look who's here!MASTER CHEF AVIROOP PAUL, Nah!! just kidding. chalo,tell me,what's there lying sad in your kitchen now?? I'll give you the best Desi recipes macha!!"
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = async () => {
    if (input.trim() !== '') {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      try {
        const recipes = await fetchIndianRecipes(input.trim());

        let botResponse;
        if (recipes && recipes.length > 0) {
          const recipe = recipes[0];
          botResponse = {
            sender: 'bot',
            text: `Here's a recipe that matches your ingredients: <a href="${recipe.url}" target="_blank">${recipe.label}</a>.`
          };
        } else {
          botResponse = {
            sender: 'bot',
            text: `Sorry, I couldn't find any Indian recipes with the ingredients: ${input.trim()}.`
          };
        }
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        const botResponse = { sender: 'bot', text: 'There was an error fetching recipes. Please try again.' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }

      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          Apka Apna Baawarchi Anna
        </div>
        <div className="chat-box">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              dangerouslySetInnerHTML={{ __html: message.text }}  // Render HTML
            />
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type ingredients separated by commas..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
