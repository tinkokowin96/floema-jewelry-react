import { Route } from "react-router"
import AboutContainer from "./about.container"
import { aboutState } from "./about.state"

//@ts-ignore
const AboutPage = ({ match: { path }, history }) => {
  aboutState.history = history
  return (
    <div>
      <Route exact path={path} component={AboutContainer} />
    </div>
  )
}

export default AboutPage
