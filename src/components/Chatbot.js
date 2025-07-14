import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chatbot.css';
import ReactMarkdown from 'react-markdown';

const Chatbot = ({ products }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const productInfo = products.map(p => 
        `ID: ${p.id}, Tên: ${p.name}, Giá: ${p.price.toLocaleString('vi-VN')} VNĐ, Mô tả ngắn: ${p.shortDescription}`
      ).join('\n');

      const prompt = `Bạn là một trợ lý tư vấn khóa học thông minh cho sàn giáo dục trực tuyến. Dựa trên danh sách khóa học sau, hãy tư vấn và gợi ý các khóa học phù hợp với yêu cầu của người dùng. Nếu không tìm thấy khóa học phù hợp, hãy thông báo rằng bạn không tìm thấy và đề nghị tìm kiếm các khóa học khác.\n\nDanh sách khóa học hiện có:\n${productInfo}\n\nYêu cầu của người dùng: "${userMessage.text}"\n\nHãy trả lời một cách tự nhiên, thân thiện và hữu ích, tập trung vào việc gợi ý các khóa học từ danh sách trên.`;

      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "AIzaSyDgKR_vNWjvURlZ0oPpvS2vIgn93YlhG00";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const aiResponseText = result.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'Xin lỗi, tôi không thể tạo ra câu trả lời lúc này. Vui lòng thử lại.' }]);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">Chatbot AI Tư vấn Sản phẩm ✨</h2>
      <div className="messages-container">
        {messages.length === 0 && (
          <p className="empty-message">Chào mừng bạn đến với Chatbot AI! Hãy hỏi tôi về các khóa học bạn quan tâm.</p>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.role === 'user' ? 'message-user-row' : 'message-ai-row'}`}>
            <div className={`message-bubble ${msg.role === 'user' ? 'message-user-bubble' : 'message-ai-bubble'}`}>
              {msg.role === 'ai' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="loading-message-row">
            <div className="loading-bubble">
              <svg className="spinner" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span> Đang nghĩ...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hỏi tôi về khóa học..."
          className="input-field"
          disabled={loading}
        />
        <button type="submit" className="send-button" disabled={loading}>Gửi</button>
      </form>
    </div>
  );
};

export default Chatbot;