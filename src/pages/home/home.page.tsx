import { Route } from "react-router";
import HomeContainer from "./home.container";

//@ts-ignore
const HomePage = ({ match: { path } }) => {
  return (
    <div>
      <Route exact path={path} component={HomeContainer} />
    </div>
  );
};

export default HomePage;
