import ItemsLayout from '../components/items/ItemsLayout';
import withAuth from '../utils/withAuth';

function ItemsPage() {
  return <ItemsLayout />;
}

export default withAuth(ItemsPage);
