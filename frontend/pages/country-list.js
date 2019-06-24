import CountryList from '../components/Admin/Country/CountryList';
import AdminMenu from '../components/Admin/AdminMenu';

const CategoryPage = ({ query }) => (
  <div>
    <AdminMenu />
    <CountryList page={parseFloat(query.page) || 1} />
  </div>
);

export default CategoryPage;
