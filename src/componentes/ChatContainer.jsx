import React, { useState } from 'react';
import ChatUI from './ChatUI';

const API_URL = "http://localhost:8080/api/retrieval/consultar";

const ChatContainer = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            role: 'user',
            content: input.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: currentInput }),
            });

            if (!response.ok) {
                throw new Error('Erro ao consultar o servidor');
            }

            // O backend retorna String pura (ResponseEntity<String>)
            const answer = await response.text();
            
            const botMessage = {
                role: 'bot',
                content: answer || "Desculpe, não consegui encontrar uma resposta."
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Erro no RAG:", error);
            const errorMessage = {
                role: 'bot',
                content: "Ocorreu um erro ao processar sua pergunta. Verifique se o servidor está rodando."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ChatUI
            messages={messages}
            input={input}
            setInput={setInput}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
        />
    );
};

export default ChatContainer;
