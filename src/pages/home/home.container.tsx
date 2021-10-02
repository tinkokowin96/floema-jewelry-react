import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Loading from "../../components/loading";
import { selectLoading } from "../../redux/assets/assets.selector";
import Home from "./home";

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
});

const HomeContainer = connect(mapStateToProps)(Loading(Home));

export default HomeContainer;
