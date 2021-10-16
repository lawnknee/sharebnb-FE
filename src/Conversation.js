import React, { useContext } from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import SharebnbApi from "./api";
import UserContext from "./UserContext";
import "./Conversation.css";

/** Renders a conversation between logged in user and another user.
 *
 * Routes -> Conversation
 *
 * Props: sendMessage
 * State: conversation, isLoading, formData
 */

export default function Conversation({ sendMessage }) {
  const { currentUser } = useContext(UserContext);
  const { otherUser } = useParams();

  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ text: "" });
  const [alert, setAlert] = useState([]);

  useEffect(
    function getListingDetails() {
      async function fetchConversation(otherUser) {
        const messages = await SharebnbApi.getConversation(
          currentUser.username,
          otherUser
        );
        if (messages.length !== conversation.length) {
          setConversation(messages);
        }
        setIsLoading(false);
      }
      fetchConversation(otherUser);
    },
    [conversation]
  );

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    let data = {
      ...formData,
      username: currentUser.username,
      toUser: otherUser,
    };

    try {
      const newMessage = await sendMessage(data);
      setConversation((oldConversation) => [...oldConversation, newMessage]);
      setAlert(["Message sent!"]);
      for (let input of evt.target) {
        input.value = "";
      }
    } catch (err) {
      setAlert(err);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <div className="Conversation">
      <div className="Conversation-body container">
        <div className="Conversation-row row justify-content-center">
          <div className="col-md-6">
              <div className="card-heading clearfix border-bottom mt-5 mb-4">
                <h4 className="card-title">Conversation with {otherUser}</h4>
              </div>
            <div className="card conversation-card card-white mb-5 mt-5 overflow-auto">
              <div className="card-body">
                <ul className="list-unstyled message">
                  {conversation.map((m) => (
                    <li key={m.id}>
                      <span className="h5">
                        {m.fromUser === currentUser.username
                          ? "You"
                          : m.fromUser}
                        {": "}
                      </span>
                      {m.text}
                      {m.sent_time}
                    </li>
                  ))}
                  <form onSubmit={handleSubmit}>
                    <input
                      name="text"
                      className="mt-4 form-control"
                      type="text"
                      placeholder="Send a message."
                      onChange={handleChange}
                      value={formData.text}
                    ></input>
                  </form>
                  {alert.length > 0 &&
                    alert.map((a) => (
                      <div key={a} className="mt-5 alert alert-info">
                        <strong>{a}</strong>
                      </div>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
