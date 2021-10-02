import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAssetsStart } from "./redux/assets/assets.actions";
import HomePage from "./pages/home/home.page";
import AboutPage from "./pages/about/about.page";
import CollectionsPage from "./pages/collections/collections.page";

const App = ({ fetchAssetsStart }: any) => {
  useEffect(() => {
    fetchAssetsStart();
  }, [fetchAssetsStart]);
  return (
    <Router>
      <Switch>
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/collections" component={CollectionsPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchAssetsStart: () => dispatch(fetchAssetsStart()),
});
export default connect(null, mapDispatchToProps)(App);
