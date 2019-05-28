import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { PageTransition } from 'next-page-transitions';
import styled from 'styled-components';
import Page from '../components/Static/Page';
import withData from '../lib/withData';
import Loading from '../components/Static/Loading';

const AnimationStyle = styled.div`
  .page-transition-enter {
    opacity: 0;
  }
  .page-transition-enter-active {
    opacity: 1;
    transition: opacity 250ms;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 250ms;
  }
`;
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <AnimationStyle>
        <PageTransition timeout={250} classNames="page-transition">
          <Container>
            <ApolloProvider client={apollo}>
              <Page>
                <Component {...pageProps} />
              </Page>
            </ApolloProvider>
          </Container>
        </PageTransition>
      </AnimationStyle>
    );
  }
}

export default withData(MyApp);
