import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import '../styles/sustainability-chat.css';

const SustainabilityChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchWelcomeMessage();
  }, []);

  const fetchWelcomeMessage = async () => {
    try {
      console.log('Fetching welcome message from:', `${BASE_URL}/groq/welcome`);
      const res = await fetch(`${BASE_URL}/groq/welcome`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch welcome message');
      }

      const data = await res.json();
      setMessages([{ role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error fetching welcome message:', error);
      setMessages([{ 
        role: 'assistant', 
        content: 'Welcome! I\'m your sustainable travel assistant. How can I help you with eco-friendly travel today?' 
      }]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/groq/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          userId: user._id,
          message: userMessage
        })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sustainability-chat">
      <Container>
        <Row>
          <Col lg="12">
            <div className="chat-container">
              <div className="chat-header">
                <h2>Sustainable Travel Assistant</h2>
                <p>Get tips and advice for eco-friendly travel</p>
              </div>

              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
                  >
                    <div className="message-content">
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="message assistant-message">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <Form onSubmit={handleSubmit} className="chat-input-form">
                <FormGroup className="d-flex gap-2">
                  <Input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about sustainable travel..."
                    disabled={loading}
                  />
                  <Button 
                    type="submit" 
                    className="btn primary__btn"
                    disabled={loading || !inputMessage.trim()}
                  >
                    Send
                  </Button>
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SustainabilityChat; 