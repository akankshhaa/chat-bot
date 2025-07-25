import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyScrollRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    const latestUserMessage =
      history
        .slice()
        .reverse()
        .find((msg) => msg.role === "user")?.text || "";

    const formattedHistory = [
      {
        role: "user",
        parts: [
          {
            text: `You are a helpful assistant. Only return the final answer. Do not include any reasoning or analysis. Respond concisely and clearly.\nUser: ${latestUserMessage}`,
          },
        ],
      },
    ];

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const url = `${import.meta.env.VITE_API_URL}?key=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      console.log("API response:", data);

      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }

      const apiResponseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      updateHistory(apiResponseText.trim());
    } catch (error) {
      console.error("Error fetching bot response:", error.message || error);
      updateHistory("⚠️ Failed to get a response.");
    }
  };

  useEffect(() => {
    if (chatBodyScrollRef.current) {
      chatBodyScrollRef.current.scrollTo({
        top: chatBodyScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-outlined">
          {showChatbot ? "close" : "mode_comment"}
        </span>
      </button>

      {showChatbot && (
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">TalkMate</h2>
            </div>
            <button
              className="material-symbols-outlined"
              onClick={() => setShowChatbot(false)}
            >
              keyboard_arrow_down
            </button>
          </div>

          <div ref={chatBodyScrollRef} className="chat-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hello! 👋 <br /> I’m here to help. What can I do for you today?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>

          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
