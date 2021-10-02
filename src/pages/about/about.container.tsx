import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LoadingWrapper from "../../components/loading.wrapper";
import { selectAbout, selectLoading } from "../../redux/assets/assets.selector";
import About from "./about";

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  collections: selectAbout,
});

const AboutContainer = connect(mapStateToProps)(LoadingWrapper(About));

export default AboutContainer;
