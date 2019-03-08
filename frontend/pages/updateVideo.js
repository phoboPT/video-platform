import UpdateVideo from "../components/VideoManager/UpdateVideo";

const Update = ({ query }) => (
  <div>
    <UpdateVideo id={query.id} />
  </div>
);

export default Update;
