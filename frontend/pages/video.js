import ShowVideo from '../components/VideoManager/ShowVideo';

const Update = ({ query }) => (
  <div>
    <ShowVideo id={query.id} />
  </div>
);

export default Update;
