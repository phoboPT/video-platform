import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Facebook Login:
 * Authentication with Facebook
 */
class FacebookLogin extends PureComponent {
  static propTypes = {
    /**
     * Facebook App Id
     */
    appId: PropTypes.string.isRequired,
    /**
     * Callback triggered on element click
     */
    callback: PropTypes.func.isRequired,
    /**
     * Children elements
     */
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    /**
     * Facebook fields: https://developers.facebook.com/docs/graph-api/reference/v3.1/user
     */
    fields: PropTypes.string,
    /**
     * Facebook language: https://developers.facebook.com/docs/accountkit/languages
     */
    language: PropTypes.string,
    /**
     * Callback for custom failure situation
     */
    onFailure: PropTypes.func,
    /**
     * Facebook scope: https://developers.facebook.com/docs/facebook-login/permissions
     */
    scope: PropTypes.string,
    /**
     * Facebook version: https://developers.facebook.com/docs/apps/versions
     */
    version: PropTypes.string,
  };

  static defaultProps = {
    fields: 'name,email',
    language: 'en_US',
    onFailure: null,
    scope: 'public_profile,email',
    version: 'v3.1',
  };

  constructor(props) {
    super(props);
    this.state = {
      isSdkLoaded: false,
    };
  }

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.sdkLoaded);
    this.loadFBSdk();
  }

  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.sdkLoaded);
  }

  sdkLoaded = () => {
    this.setState({ isSdkLoaded: true });
  };

  loadFBSdk() {
    const { appId, language, version } = this.props;
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: `${appId}`,
        autoLogAppEvents: true,
        xfbml: false,
        version: `${version}`,
      });
      const fbInitEvent = new Event('FBObjectReady');
      document.dispatchEvent(fbInitEvent);
    };

    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/${language}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  onClick = () => {
    if (!this.state.isSdkLoaded && !window.FB) return;
    const {
      fields, callback, onFailure, scope,
    } = this.props;

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          window.FB.api(`/me?fields=${fields}`, (user) => {
            const { accessToken } = response.authResponse;
            callback({ status: response.status, user, accessToken });
          });
        } else if (onFailure) {
          onFailure({ status: response.status });
        } else {
          callback({ status: response.status });
        }
      },
      { scope },
    );
  };

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default FacebookLogin;
