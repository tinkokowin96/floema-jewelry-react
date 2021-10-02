import { Route } from "react-router";
import AboutContainer from "./about.container";

//@ts-ignore
const AboutPage = ({ match: { path } }) => {
  return (
    <div>
      <Route exact path={path} component={AboutContainer} />
    </div>
  );
};

export default AboutPage;
