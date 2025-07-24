const ChatForm = () => {
  return (
    <form action="#" className="chat-form">
      <input
        type="text"
        placeholder="Type a message..."
        className="message-input"
        required
      />

      <button type="submit" className="material-symbols-outlined">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;
