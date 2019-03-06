import Signup from "../components/Authentication/Signup";
import styled from "styled-components";
import Signin from "../components/Authentication/Signin";
import RequestReset from "../components/Authentication/RequestReset";
// import RequestReset from "../components/RequestReset";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <Columns>
    <Signup />
    <Signin />
    <RequestReset />
    {/* <RequestReset /> */}
  </Columns>
);

export default SignupPage;
