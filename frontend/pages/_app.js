import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { PageTransition } from 'next-page-transitions';
import styled from 'styled-components';
import Page from '../components/Static/Page';
import withData from '../lib/withData';

const AnimationStyle = styled.div`
  .page-transition-enter {
    opacity: 0;
  }
  .page-transition-enter-active {
    opacity: 1;
    transition: opacity 150ms;
  }
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 150ms;
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
        <Container>
          <ApolloProvider client={apollo}>
            <PageTransition timeout={150} classNames="page-transition">
              <Page key={Math.floor(Math.random() * 100 + 1)}>
                <Component {...pageProps} />
              </Page>
            </PageTransition>
          </ApolloProvider>
        </Container>
      </AnimationStyle>
    );
  }
}

export default withData(MyApp);
