import React, { useContext } from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import SharebnbApi from "./api";
import UserContext from "./UserContext";

/** Renders a Loading message during API requests. */

export default function Conversation() {
  const { currentUser } = useContext(UserContext);
  const { otherUser } = useParams();

  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getListingDetails() {
    async function fetchConversation(otherUser) {
      const messages = await SharebnbApi.getConversation(
        currentUser.username,
        otherUser
      );
      setConversation(messages);
      setIsLoading(false);
    }
    fetchConversation(otherUser);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="Conversation container mt-5">
      <div className="Conversation-row row">
        <div className="col-md-12">
          <div className="card card-white mb-5">
            <div className="card-heading clearfix border-bottom mb-4">
              <h4 className="card-title">Conversation with {otherUser}</h4>
            </div>
            <div className="card-body">
              <ul className="list-unstyled message">
                {conversation.map((m) => (
                  <li key={m.id}>
                    <div className="media align-items-center">
                      <div className="media-body">
                        <span className="h5">
                          {m.fromUser === currentUser.username
                            ? "You"
                            : m.fromUser}
                          {": "}
                        </span>
                        {m.text}
                        {m.sent_time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
