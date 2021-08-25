import {Link} from 'react-router-dom';

/** NotFound Component
 *  Rendered when user has requested a route that does not exist.
 *
 *  App -> NotFound
 */
function NotFound(){
  return(
    <div className="NotFound">
      <h1>Page not found.</h1>
      <Link to="/"> Go back to the homepage. </Link>
    </div>
  );
}
export default NotFound;