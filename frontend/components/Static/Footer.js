import styled from 'styled-components';
import Link from 'next/link';
import PermissionUser from '../Authentication/PermissionUser';

const StyleFooter = styled.div`
  bottom: 0;
  margin-top: 5rem;
  padding: 10px;
  margin-left: ${props => props.sidebarState === 1 && '40px!important'};
  margin-left: ${props => props.sidebarState === 2 && '150px!important'};

  display: flex;
  background: #e2e2e2;

  p {
    flex: 1;
    order: 1;
    text-align: left;
    color: black;
    font-size: 1.3rem;
    margin-left: 1rem;
  }

  #a {
    a {
      box-shadow: 0 0 3px #999797;
      background: #ededed;
      padding: 1rem;
      margin-top: 2rem;
      margin-right: 1rem;
      font-size: 1.3rem;
    }
    padding-top: 1.2rem;
    flex: 1;
    order: 3;
    text-align: right;
  }
`;

const Footer = ({ sidebarState }) => (
  <PermissionUser>
    {({ data: { me } }) => (
      <StyleFooter sidebarState={sidebarState}>
        <p>Copyright © 2019 Picus Creative</p>
        {me &&
          (me.permission[0] === 'USER' && (
            <div id="a">
              <Link href="/becomeInstructor">
                <a id="become" href="/becomeInstructor">
                  Become an Instructor
                </a>
              </Link>
            </div>
          ))}
      </StyleFooter>
    )}
  </PermissionUser>
);

export default Footer;
