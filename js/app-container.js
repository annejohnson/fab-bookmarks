var bookmarksDatabase = new Firebase('https://fab-bookmarks.firebaseio.com/bookmarks');
var formStyles = { marginTop: '20px' };
var formButtonStyles = { marginBottom: '0' };
var formErrorStyles = { padding: '0.4rem' };
var formHeaderStyles = { marginBottom: '15px' };

var AppContainer = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { bookmarksByKey: {}, authData: null };
  },
  componentWillMount: function() {
    this.bindAsArray(bookmarksDatabase, 'bookmarks');
    this.bindAsObject(bookmarksDatabase, 'bookmarksByKey');
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
    var bookmarkKeys = this.state ? Object.keys(this.state.bookmarksByKey || {}) : [];
    var bookmarks = bookmarkKeys.map(function(key) {
      return {
        uid: key,
        val: this.state.bookmarksByKey[key]
      };
    }.bind(this));
    return (
      <div className="appContainer">
        <BookmarkList bookmarks={bookmarks} />
        {form}
      </div>
    );
  }
});
