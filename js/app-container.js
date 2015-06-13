var bookmarksDatabase = new Firebase('https://fab-bookmarks.firebaseio.com/bookmarks');
var formStyles = { marginTop: '20px' };
var formButtonStyles = { marginBottom: '0' };
var formErrorStyles = { padding: '0.4rem' };
var formHeaderStyles = { marginBottom: '15px' };
var validUrl = function(url) {
  return url.match(/https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/);
};
var getBookmarkError = function(title, url) {
   if (!title)
     return "Title must not be blank";
   if (!validUrl(url))
     return "URL is invalid";
   return null;
};

var AppContainer = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { bookmarksByKey: {}, authData: null };
  },
  componentWillMount: function() {
    bookmarksDatabase.onAuth(function(authData) {
      if (authData) {
        this.bindAsObject(bookmarksDatabase.child(authData.uid), 'bookmarksByKey');
        this.setState({ bookmarksByKey: this.state.bookmarksByKey, authData: authData });
      }
    }.bind(this));
  },
  render: function() {
    var form = this.state.authData ? (
      <NewBookmarkForm authData={this.state.authData} />
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
        <BookmarkList bookmarks={bookmarks} authData={this.state.authData} />
        {form}
      </div>
    );
  }
});
