import { useQuery } from '@apollo/client';

import { COLLECTIONS } from '../../graphql/collections/collections.queries';

import Spinner from '../spinner/spinner.component';
import CollectionsOverview from './collections-overview.component';

const CollectionsOverviewContainer = () => {
  const { loading, data } = useQuery(COLLECTIONS);

  if (loading) return <Spinner />;

  return <CollectionsOverview collections={data.collections} />;
};

export default CollectionsOverviewContainer;
