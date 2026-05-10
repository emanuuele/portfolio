"use client";

import { SendOutlined } from "@ant-design/icons";
import stylesChat from "./styles.module.css";
export default function Chat() {
    return (
        <article className={`${stylesChat.chatContainer}`}>
            <h2 className={stylesChat.chatTitle}>emanuele maria</h2>
            <div className={stylesChat.messages}>
                
            </div>
            <form className={stylesChat.inputContainer}>
                <input type="text" className={stylesChat.input} placeholder="Digite sua mensagem..." />
                <button type="submit" className={stylesChat.sendButton}>
                    <SendOutlined />
                </button>
            </form>
        </article>
    );
}