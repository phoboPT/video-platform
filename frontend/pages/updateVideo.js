import UpdateVideo from "../components/Courses/MyVideos/UpdateVideo";

const Update = ({ query }) => (
  <div>
    <UpdateVideo id={query.id} />
  </div>
);

export default Update;
