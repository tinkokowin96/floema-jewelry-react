import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LoadingWrapper from "../../components/loading.wrapper";
import {
  selectCollections,
  selectLoading,
} from "../../redux/assets/assets.selector";
import Collections from "./collections";

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  collections: selectCollections,
});

const CollectionsContainer = connect(mapStateToProps)(
  LoadingWrapper(Collections)
);

export default CollectionsContainer;
