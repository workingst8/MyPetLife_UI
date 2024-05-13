import React, { useState } from 'react';
import styles from './Chat.module.scss';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<{ content: string; time: string; fromMe: boolean }[]>([]);
    const [inputText, setInputText] = useState<string>('');

    const sendMessage = () => {
        const text = inputText.trim();
        if (text !== '') {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? '오후' : '오전';
            const formattedHours = hours % 12 || 12;
            const timeString =
                ampm + ' ' + (formattedHours < 10 ? '0' : '') + formattedHours + ':' + (minutes < 10 ? '0' : '') + minutes;

            const newMessage = {
                content: text,
                time: timeString,
                fromMe: true
            };

            setMessages([...messages, newMessage]);
            setInputText('');

            const chatContainer = document.querySelector(`.${styles.middle}`);
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }
    };

    return (
        <section className={styles.chat}>
            <div className={styles.wrap}>
                <div className={styles.top}>
                    <img src="./images/chat/chat_top.svg" alt="chat_top" />
                    대화상대
                </div>
                <div className={styles.middle}>
                    <div className={styles.line}>0000년 00월 00일</div>
                    {messages.map((message, index) => (
                        <div key={index} className={message.fromMe ? styles.me : styles.other}>
                            {!message.fromMe && <img src="./images/chat/default_other.svg" alt="other" />}
                            {message.fromMe && <span className={styles.time}>{message.time}</span>}
                            <p className={styles.content}>{message.content}</p>
                            {message.fromMe && <img src="./images/chat/default_me.svg" alt="me" />}
                            {!message.fromMe && <span className={styles.time}>{message.time}</span>}
                        </div>
                    ))}
                </div>
                <div className={styles.bottom}>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                sendMessage();
                                e.preventDefault();
                            }
                        }}
                        placeholder="내용을 입력해주세요"
                    ></textarea>
                    <button type="button" onClick={sendMessage}>
                        <img src="./images/chat/enter.svg" alt="enter" />
                    </button>
                </div>
            </div>
        </section>
    );
    
};

export default Chat;
