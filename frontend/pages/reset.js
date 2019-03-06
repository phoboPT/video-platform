import Reset from "../components/Authentication/Reset";

const ResetPage = props => (
  <div>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default ResetPage;
