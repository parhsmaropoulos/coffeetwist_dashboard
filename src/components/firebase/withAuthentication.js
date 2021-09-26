import React from "react";

import { AuthUserContext } from "./base";
import { withFirebase } from "./base";

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        hasLoaded: false,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onIdTokenChanged(
        async (authUser) => {
          this.setState({ hasLoaded: true });
          if (authUser) {
            localStorage.setItem("authUser", JSON.stringify(authUser));
            const firToken =
              await this.props.firebase.auth.currentUser.getIdToken(true);
            localStorage.setItem("firToken", firToken);
            this.setState({ authUser });
          } else {
            localStorage.removeItem("authUser");
            localStorage.removeItem("firToken");
            this.setState({ authUser: null });
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const hasLoaded = this.state.hasLoaded;
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          {hasLoaded ? (
            <Component {...this.props} />
          ) : (
            <h1 align="center">Refreshing Token...</h1>
          )}
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
