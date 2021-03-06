var NewSessionForm = React.createClass({
  getInitialState: function() {
    return { error: null, type: null };
  },
  handleSignupSwitch: function() {
    this.setState({ type: 'signup', error: null });
    $('#modal-new-session-form').openModal();
  },
  handleLoginSwitch: function() {
    this.setState({ type: 'login', error: null });
    $('#modal-new-session-form').openModal();
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
      <ErrorNotification message={this.state.error} />
    ) : "";
    var formHeaderText = this.state.type === 'login' ? "Log In" : "Sign Up";
    var formButtonText = formHeaderText;
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
      <form className="newSessionForm card-panel collection modal" id="modal-new-session-form" onSubmit={this.handleSubmit} style={formStyles}>
        <div className="collection-item">
          <h5 className="center-align" style={formHeaderStyles}>{formHeaderText}</h5>
          {errorNotification}
          <div className="row">
            <div className="input-field s12 col">
              <input type="text" id="new-session-email" ref="email" />
              <label for="new-session-email">Email</label>
            </div>
            <div className="input-field s12 col">
              <input type="password" id="new-session-password" ref="password" />
              <label for="new-session-password">Password</label>
            </div>
            <div className="s12 col center-align">
              <button type="submit" className="waves-effect waves-light btn">{formButtonText}</button>
            </div>
            <div className="s12 col">
              {switchTypeHtml}
            </div>
          </div>
        </div>
      </form>
    );
    var loginOrSignupHtml = (
      <div className="row">
        <div className="s12 m10 offset-m1 col center-align">
          <div className="card-panel">
            <h5>Hello, Guest! Please log in or sign up to continue.</h5>
            <a href="javascript:void(0)" className="waves-effect waves-light btn btn-margin-right" onClick={this.handleLoginSwitch}>Log In</a>
            <a href="javascript:void(0)" className="waves-effect waves-light btn btn-margin-left" onClick={this.handleSignupSwitch}>Sign Up</a>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        {formHtml}
        {loginOrSignupHtml}
      </div>
    );
  }
});
