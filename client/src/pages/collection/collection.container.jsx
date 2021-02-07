import { useQuery } from '@apollo/client';

import Spinner from '../../components/spinner/spinner.component';
import { COLLECTION_BY_TITLE } from '../../graphql/collections/collections.queries';

import CollectionPage from './collection.component';

const CollectionPageContainer = ({ match }) => {
  const { loading, data } = useQuery(COLLECTION_BY_TITLE, {
    variables: { title: match.params.collectionId },
  });

  if (loading) return <Spinner />;

  const collection = data.getCollectionsByTitle;

  return <CollectionPage collection={collection} />;
};

export default CollectionPageContainer;
