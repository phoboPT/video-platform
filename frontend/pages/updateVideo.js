import UpdateVideo from '../components/InstructorArea/MyVideos/UpdateVideo';

const Update = ({ query }) => (
  <div>
    <UpdateVideo id={query.id} />
  </div>
);

export default Update;
