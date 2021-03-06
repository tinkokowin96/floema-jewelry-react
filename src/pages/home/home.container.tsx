import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LoadingWrapper from "../../components/loading.wrapper";
import { selectHome, selectLoading } from "../../redux/assets/assets.selector";
import Home from "./home";

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  collections: selectHome,
});

const HomeContainer = connect(mapStateToProps)(LoadingWrapper(Home));

export default HomeContainer;
