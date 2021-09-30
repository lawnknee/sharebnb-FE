import { useState, useEffect, useContext } from "react";
import SharebnbApi from "./api";
import UserContext from "./UserContext";

/**  Messages Component
 *
 *
 *
 * App -> Routes -> Messages
 */

function Messages() {
  const { currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  useEffect(
    function getMessages() {
      async function fetchMessages() {
        let messages = await SharebnbApi.getMessages(currentUser.id);
        setMessages(messages);
      }
      fetchMessages();
    },
    [currentUser]
  );

  console.log(messages);

  return (
    <div className="Messages container mt-5">
      <div className="Messages-row row">
        <div className="col-md-12">
          <div className="card card-white mb-5">
            <div className="card-heading clearfix border-bottom mb-4">
              <h4 className="card-title">Inbox</h4>
            </div>
            <div className="card-body">
              <ul className="list-unstyled message">
                {messages.map((m) => (
                  <li key={m.id}>
                    <div className="media align-items-center">
                      <div className="media-body">
                        <h5>{m.from_user.first_name} {m.from_user.last_name} <span className="float-right text-primary">reply</span></h5>
                        {m.body}
                        {m.sent_at}
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

export default Messages;
