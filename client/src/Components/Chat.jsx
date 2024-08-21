import "./Chat.css";
import Details from "./Details";
import profileImage from "../assets/user.svg";
import emoji from "../assets/emoji.png";
import mic from "../assets/mic.png";
import img from "../assets/img.png";
import camera from "../assets/camera.png";
import messageImg from "../assets/prof6.jpeg";
import "./MessageRoom.css";
import EmojiPicker from "emoji-picker-react";
import person from "../assets/prof6.jpeg";
import person2 from "../assets/prof7.jpeg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./ChatSidebar.css";
import "./Chatlist.css";

import { useEffect, useRef, useState } from "react";
function Chat() {
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");
  const [chatVisible, setChatVisible] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  function handleEmojiClick(e) {
    setMessage((prev) => prev + e.emoji);
  }
  return (
    <div className="chat">
      {/* Chat sidebar code */}
      <div
        className={`chat-sidebar ${chatVisible ? "chatsidebar-hidden" : null}`}
      >
        <div className="chatlist">
          <div className="chatlist-search-bar">
            <input
              type="search"
              className="chatlist-search"
              placeholder="Search🔍"
            />
          </div>
          <div className="userItem" onClick={() => setChatVisible(true)}>
            <img src={person} alt="" />
            <div className="userText">
              <span>King James</span>
              <p>Hello</p>
            </div>
          </div>
          <div className="userItem" onClick={() => setChatVisible(true)}>
            <img src={person2} alt="" />
            <div className="userText">
              <span>Anthony Davis</span>
              <p>Hello</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Room code */}
      <div
        className={`message-room ${chatVisible ? "" : "message-room-hidden"}`}
      >
        <div className="message-room-top">
          <div className="userDetails">
            <img src={profileImage} alt="" />
            <div className="userDetailsText">
              <span>King James</span>
              <p>This is king James</p>
            </div>
          </div>
          <div className="back sendBtn" onClick={() => setChatVisible(false)}>
            <AiOutlineArrowLeft />
          </div>
        </div>
        <div className="message-room-center">
          <div className="message">
            <div className="messageText">
              <p>Hello Sir</p>
              <span>6:32</span>
            </div>
          </div>
          <div className="message own">
            <div className="messageText">
              <p>Hello. How are you?</p>
              <span>6:32</span>
            </div>
          </div>
          <div className="message">
            <div className="messageText">
              <p>I'm good sir.</p>
              <span>6:32</span>
            </div>
          </div>
          <div className="message own">
            <img src={messageImg} alt="" />
            <div className="messageText">
              <p>Hello. How are you?</p>
              <span>6:32</span>
            </div>
          </div>
          <div className="message">
            <div className="messageText">
              <p>I'm good sir.</p>
              <span>6:32</span>
            </div>
          </div>
          <div ref={endRef}></div>
        </div>
        <div className="message-room-bottom">
          <div className="icons">
            <img src={img} alt="" />
            <img src={camera} alt="" />
            <img src={mic} alt="" />
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="emoji">
            <img
              src={emoji}
              alt=""
              onClick={() => setShowEmojis((prev) => !prev)}
            />
            <div className="emoji-picker">
              <EmojiPicker open={showEmojis} onEmojiClick={handleEmojiClick} />
            </div>
          </div>
          <button className="sendBtn">Send</button>
        </div>
      </div>

      <Details />
    </div>
  );
}

export default Chat;
