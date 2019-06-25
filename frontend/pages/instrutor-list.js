import InstrutorList from '../components/Admin/Instrutor/InstrutorList';
import AdminMenu from '../components/Admin/AdminMenu';

const InstrutorPage = ({ query }) => (
  <div>
    <AdminMenu />
    <InstrutorList page={parseFloat(query.page) || 1} />
  </div>
);

export default InstrutorPage;
