import InterestList from '../components/Admin/Interests/InterestList';
import AdminMenu from '../components/Admin/AdminMenu';

const CategoryPage = ({ query }) => (
  <div>
    <AdminMenu />
    <InterestList page={parseFloat(query.page) || 1} />
  </div>
);

export default CategoryPage;
