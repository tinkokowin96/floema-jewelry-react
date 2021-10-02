import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectHome } from "../../redux/assets/assets.selector";

console.log("now on home....");
const Home = ({ collections }: any) => {
  return <div>{collections}</div>;
};

const mapStateToProps = createStructuredSelector({
  collections: selectHome,
});

export default connect(mapStateToProps)(Home);
