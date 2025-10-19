import React, { useRef } from "react";
import {
  Chat,
  Channel,
  MessageInput,
  useChannelStateContext,
} from "stream-chat-react";
import { useSelector } from "react-redux";

const Loader = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-2 border-blue-500 border-t-transparent"></div>
  </div>
);

const MeetingChat = ({ chatClient, channel, showChat, setShowChat }) => {
  const messagesEndRef = useRef(null);

  // Replace with your actual Redux state selector
  const user = useSelector((state) => state.auth.user);

  if (!chatClient || !channel) return <Loader />;

  return (
    <div className={`meeting-chat ${showChat ? "show" : ""}`}>
      <div className="meeting-chat-header">
        <span>Meeting Chat</span>
        <button onClick={() => setShowChat(false)} aria-label="Close Chat">
          ✕
        </button>
      </div>

      <div className="meeting-chat-messages" ref={messagesEndRef}>
        <Chat client={chatClient} theme="messaging light">
          <Channel channel={channel}>
            <CustomMessageList currentUser={user} />

            <div className="meeting-chat-input">
              <MessageInput focus hideAiAssist />
            </div>
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

const CustomMessageList = ({ currentUser }) => {
  const { messages } = useChannelStateContext();
  const reduxUser = currentUser;

  return messages.map((msg) => {
    // Check if the message is from the current user
    const isSelf = msg.user.id === reduxUser._id;

    // Use Stream avatar if exists, else Redux avatar, else placeholder initials
    const avatar =
      msg.user.image ||
      reduxUser.avatar ||
      getInitialsAvatar(msg.user.name || reduxUser.name);

    return (
      <div key={msg.id} className={`meeting-message ${isSelf ? "self" : ""}`}>
        {/* Opponent's Avatar */}
        {!isSelf && (
          <img
            src={avatar}
            alt={msg.user.name || "User"}
            className="meeting-message-avatar"
          />
        )}

        <div className="meeting-message-bubble">
          {/* Opponent's Username */}
          {!isSelf && (
            <div className="meeting-message-username">
              {msg.user.name || reduxUser.name}
            </div>
          )}

          {/* RENDER TEXT CONTENT */}
          {(msg.text || msg.html) && (
            <div dangerouslySetInnerHTML={{ __html: msg.html || msg.text }} />
          )}

          {/* RENDER ATTACHMENTS (Images/Files) */}
          {msg.attachments && msg.attachments.length > 0 && (
            <div className="meeting-attachments-container">
              {msg.attachments.map((attachment, index) => (
                <div key={index} className="meeting-attachment">
                  {(attachment.type === "image" ||
                    attachment.type === "video") && (
                    <a
                      href={attachment.asset_url || attachment.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={attachment.image_url || attachment.asset_url}
                        alt={attachment.title || "Attached media"}
                        className="uploaded-media"
                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                      />
                    </a>
                  )}

                  {/* File Renderer (Other types) */}
                  {attachment.type === "file" && (
                    <div className="attached-file-box">
                      <a
                        href={attachment.asset_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-download-link"
                      >
                        📎 {attachment.title || "Download File"}
                        {attachment.file_size &&
                          ` (${(attachment.file_size / 1024).toFixed(1)} KB)`}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {isSelf && (
          <img
            src={avatar}
            alt={msg.user.name || "You"}
            className="meeting-message-avatar"
          />
        )}
      </div>
    );
  });
};

function getInitialsAvatar(name) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";
  return `/placeholder/${initials}.png`;
}

export default MeetingChat;
