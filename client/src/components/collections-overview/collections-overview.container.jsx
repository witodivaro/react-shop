import { useQuery } from '@apollo/client';

import { GET_SHOP_DATA } from '../../graphql/shop/shop.queries';

import Spinner from '../spinner/spinner.component';
import CollectionsOverview from './collections-overview.component';

const CollectionsOverviewContainer = () => {
  const { loading, data } = useQuery(GET_SHOP_DATA);

  if (loading) return <Spinner />;

  return <CollectionsOverview collections={data.collections} />;
};

export default CollectionsOverviewContainer;
