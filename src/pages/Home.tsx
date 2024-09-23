import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">Choose database</div>
      <div className="home-links">
        <Link to="/users">
          <button className="btn btn-outline-warning">Users</button>
        </Link>
        <Link to="/animals">
          <button className="btn btn-outline-warning">Animals</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
