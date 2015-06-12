var bookmarksDatabase = new Firebase('https://fab-bookmarks.firebaseio.com/bookmarks');
var formStyles = { marginTop: '20px' };
var formButtonStyles = { marginBottom: '0' };
var formErrorStyles = { padding: '0.4rem' };
var formHeaderStyles = { marginBottom: '15px' };

var AppContainer = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { bookmarks: [], authData: null };
  },
  componentWillMount: function() {
    this.bindAsArray(bookmarksDatabase, 'bookmarks');
    bookmarksDatabase.onAuth(function(authData) {
      this.setState({ bookmarks: this.state.bookmarks, authData: authData });
    }.bind(this));
  },
  render: function() {
    var form = this.state.authData ? (
      <BookmarkForm />
    ) : (
      <LoginForm />
    );
    return (
      <div className="appContainer">
        <BookmarkList bookmarks={this.state.bookmarks} />
        {form}
      </div>
    );
  }
});
