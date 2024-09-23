import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="no-page-container">
      <div className="no-page-header">Error 404: Page not found</div>
      <Link to="/">
        <button className="btn btn-outline-warning">Choose database</button>
      </Link>
    </div>
  );
};

export default NoPage;
