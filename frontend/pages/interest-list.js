import InterestList from '../components/Admin/Interests/InterestList';
import AdminMenu from '../components/Admin/AdminMenu';

const InterestPage = ({ query }) => (
  <div>
    <AdminMenu />
    <InterestList page={parseFloat(query.page) || 1} />
  </div>
);

export default InterestPage;
