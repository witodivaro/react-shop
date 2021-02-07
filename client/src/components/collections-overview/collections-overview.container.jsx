import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCollectionsForPreview,
  selectIsCollectionsFetching,
} from '../../redux/shop/shop.selectors';
import { compose } from 'redux';

import Spinner from '../spinner/spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching,
  collections: selectCollectionsForPreview,
});

const CollectionsOverviewContainer = compose(connect(mapStateToProps))(
  CollectionsOverview
);

export default CollectionsOverviewContainer;
