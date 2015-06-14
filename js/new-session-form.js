var NewSessionForm = React.createClass({
  getInitialState: function() {
    return { error: null, type: null };
  },
  handleSignupSwitch: function() {
    this.setState({ type: 'signup', error: null })
  },
  handleLoginSwitch: function() {
    this.setState({ type: 'login', error: null })
  },
  submitLogin: function(email, password) {
    bookmarksDatabase.authWithPassword(
      { email: email, password: password },
      function(error) {
        this.setState({
          error: error ? error.message : null,
          type: this.state.type
        });
      }.bind(this)
    );
  },
  submitSignup: function(email, password) {
    bookmarksDatabase.createUser(
      { email: email, password: password },
      function(error) {
        if (error) {
          this.setState({ error: error.message, type: 'signup' });
        } else {
          this.submitLogin(email, password);
        }
      }.bind(this)
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    this.state.type === 'login' ?
      this.submitLogin(email, password) :
      this.submitSignup(email, password);
  },
  render: function() {
    var errorNotification = this.state.error ? (
      <div className="alert-box alert" style={formErrorStyles}>{this.state.error}</div>
    ) : "";
    var formHeaderText = this.state.type === 'login' ? "Log In" : "Sign Up";
    var formButtonText = this.state.type === 'login' ? "Log In" : "Sign Up";
    var switchTypeHtml = this.state.type === 'login' ? (
      <div>
        New user? <a href="javascript:void(0)" onClick={this.handleSignupSwitch}>Sign up here</a>.
      </div>
    ) : (
      <div>
        Already have an account? <a href="javascript:void(0)" onClick={this.handleLoginSwitch}>Log in here</a>.
      </div>
    );
    var formHtml = (
      <form className="newSessionForm panel large-10 large-centered columns" onSubmit={this.handleSubmit} style={formStyles}>
        <h5 className="text-center" style={formHeaderStyles}>{formHeaderText}</h5>
        {errorNotification}
        <div className="row">
          <div className="small-12 columns">
            <input type="text" placeholder="Email" ref="email" />
          </div>
          <div className="small-12 columns">
            <input type="password" placeholder="Password" ref="password" />
          </div>
          <div className="small-12 columns small-text-center">
            <input type="submit" value={formButtonText} className="button small" />
          </div>
          <div className="small-12 columns">
            {switchTypeHtml}
          </div>
        </div>
      </form>
    );
    var loginOrSignupHtml = (
      <div>
        <h5>Hello, Guest! Please log in or sign up to continue.</h5>
        <div className="button medium" onClick={this.handleLoginSwitch}>Log In</div>
        <div className="button medium" onClick={this.handleSignupSwitch}>Sign Up</div>
      </div>
    );
    return (
      <div>
        {this.state.type ? formHtml : loginOrSignupHtml}
      </div>
    );
  }
});