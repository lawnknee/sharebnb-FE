import { useState, useEffect, useContext } from "react";
import SharebnbApi from "./api";
import UserContext from "./UserContext";
import Loading from "./Loading";
import "./Messages.css";

/**  Messages Component
 *
 *
 *
 * App -> Routes -> Messages
 */

function Messages() {
  const { currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function getMessages() {
      async function fetchMessages() {
        let messages = await SharebnbApi.getMessages(currentUser.username);
        setMessages(messages);
      }
      fetchMessages();
      setIsLoading(false);
    },
    [currentUser]
  );

  if (isLoading) return <Loading />;

  return (
    <div className="Messages">
      <div className="Messages-body container">
        <div className="Messages-row row justify-content-center pt-5">
          <div className="col-md-6">
            <div className="inbox-card card card-white mb-5">
              <div className="card-heading clearfix border-bottom mb-4">
                <h4 className="card-title">Inbox</h4>
              </div>
              <div className="card-body">
                <ul className="list-unstyled inbox">
                  {messages.map((u) => (
                    <li key={u}>
                      <div className="media align-items-center">
                        <div className="media-body">
                          <a href={"/conversation/" + u}>{u}</a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default Messages;
