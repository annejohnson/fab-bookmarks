var LoginForm = React.createClass({
  getInitialState: function() {
    return { error: null };
  },
  componentDidMount: function() {
    this.refs.email.getDOMNode().value = '';
    this.refs.password.getDOMNode().value = '';
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    bookmarksDatabase.authWithPassword(
      { email: email, password: password },
      function(error) {
        this.setState({ error: error ? error.message : null });
      }.bind(this)
    );
  },
  render: function() {
    var errorNotification = this.state.error ? (
      <div className="alert-box alert" style={formErrorStyles}>{this.state.error}</div>
    ) : "";
    return (
      <form className="loginForm panel large-10 large-centered columns" onSubmit={this.handleSubmit} style={formStyles}>
        <h5 className="text-center" style={formHeaderStyles}>Hello, guest! Please log in to edit bookmarks:</h5>
        {errorNotification}
        <div className="row">
          <div className="small-12 columns">
            <input type="text" placeholder="Email" ref="email" />
          </div>
          <div className="small-12 columns">
            <input type="password" placeholder="Password" ref="password" />
          </div>
          <div className="small-12 columns small-text-center">
            <input type="submit" value="Log In" className="button small" style={formButtonStyles} />
          </div>
        </div>
      </form>
    );
  }
});
