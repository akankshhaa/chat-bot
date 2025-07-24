import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";

function App() {
  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>

        {/* Chat Body */}
        <div className="chat-body">
          {/* Bot message */}
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hello! 👋 <br />
              I’m here to help. What can I do for you today?
            </p>
          </div>

          {/* User message */}
          <div className="message user-message">
            <p className="message-text">
              Hi! I’d like to know more about your pricing plans.
            </p>
          </div>

          {/* Bot reply */}
          <div className="message bot-message">
            <p className="message-text">
              Sure! We offer Basic, Pro, and Enterprise plans. <br />
              Would you like a quick summary of each?
            </p>
          </div>
        </div>

        {/* Chat Footer */}
        <div className="chat-footer">
          <ChatForm />
        </div>
      </div>
    </div>
  );
}

export default App;
