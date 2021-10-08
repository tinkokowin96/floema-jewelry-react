// import { Link } from "react-router-dom";

import { useHistory } from "react-router";

const Navigation = () => {
  const history = useHistory();
  const redirectAbout = () => {
    console.log("redirecting..... about..");
  };

  const redirectCollection = () => {
    console.log("redirecting.... collections...");
  };
  return (
    <>
      {/* <Link to="/about"> About </Link>
      <Link to="/collections"> Collections </Link> */}
      <button onClick={redirectAbout}>About</button>
      <button onClick={redirectCollection}>Collections</button>
    </>
  );
};

export default Navigation;
