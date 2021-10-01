import { useEffect } from "react";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
import { fetchAssetsStart } from "../redux/assets/assets.actions";
// import { selectHome } from "../redux/assets/assets.selector";

// 1.1 We already exported in connect with default and if we export here again, there will be
// many conflicts and will cause errors like fetchAssetsStart is not a function...
const Home = ({ fetchAssetsStart }: any) => {
  useEffect(() => {
    fetchAssetsStart();
  }, [fetchAssetsStart]);
  return <div>This is the homepage.....</div>;
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchAssetsStart: () => dispatch(fetchAssetsStart()),
});

export default connect(null, mapDispatchToProps)(Home);
