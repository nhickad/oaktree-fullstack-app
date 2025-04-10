import CreateLayout from '../components/create-item/CreateLayout';
import withAuth from '../utils/withAuth';

function CreateItemPage() {
  return <CreateLayout />;
}

export default withAuth(CreateItemPage);
