import { useState, useEffect, useContext } from "react";
import SharebnbApi from "./api";
import UserContext from "./UserContext";
import Loading from "./Loading";

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

  console.log(messages);

  if (isLoading) return <Loading />;

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
    </div>
  );
}

export default Messages;
