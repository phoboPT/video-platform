import CategoryList from '../components/Admin/Category/CategoryList';
import AdminMenu from '../components/Admin/AdminMenu';

const CategoryPage = ({ query }) => (
  <div>
    <AdminMenu />
    <CategoryList page={parseFloat(query.page) || 1} />
  </div>
);

export default CategoryPage;
