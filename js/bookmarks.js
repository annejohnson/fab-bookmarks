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
var BookmarkList = React.createClass({
  render: function() {
    var bookmarkNodes = this.props.bookmarks.map(function(bookmark) {
      return (
        <Bookmark url={bookmark.url} title={bookmark.title} categories={bookmark.categories} />
      );
    });
    return (
      <div className="bookmarkList">
        {bookmarkNodes}
      </div>
    );
  }
});
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
var BookmarkForm = React.createClass({
  getInitialState: function() {
    return { error: null };
  },
  componentDidMount: function() {
    this.refs.title.getDOMNode().value = '';
    this.refs.categories.getDOMNode().value = '';
    this.refs.url.getDOMNode().value = 'http://';
  },
  validUrl: function(url) {
    return url.match(/https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/);
  },
  hasErrorState: function(title, url) {
    if (!title || !this.validUrl(url)) {
      this.setState({
        error: (!title ? "Title must not be blank" : "URL is invalid")
      });
      return true;
    }
    this.setState({ error: null });
    return false;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.getDOMNode().value.trim();
    var url = this.refs.url.getDOMNode().value.trim();
    var categories = this.refs.categories.getDOMNode().value.split(",").map(function(category) {
      return category.trim();
    }).filter(function(category) { return category; });
    if (this.hasErrorState(title, url))
      return;
    bookmarksDatabase.push({ title: title, url: url, categories: categories });
    this.refs.title.getDOMNode().value = '';
    this.refs.categories.getDOMNode().value = '';
    this.refs.url.getDOMNode().value = 'http://';
  },
  render: function() {
    var errorNotification = this.state.error ? (
      <div className="alert-box alert" style={formErrorStyles}>{this.state.error}</div>
    ) : "";
    return (
      <form className="bookmarkForm panel large-10 large-centered columns" onSubmit={this.handleSubmit} style={formStyles}>
        <h5 className="text-center" style={formHeaderStyles}>Add a New Bookmark:</h5>
        {errorNotification}
        <div className="row">
          <div className="small-6 columns">
            <input type="text" placeholder="Title" ref="title" />
          </div>
          <div className="small-6 columns">
            <input type="text" placeholder="Categories (comma-separated)" ref="categories" />
          </div>
        </div>
        <div className="row">
          <div className="small-12 columns">
            <input type="text" placeholder="URL" ref="url" />
          </div>
        </div>
        <div className="row">
          <div className="small-12 columns small-text-center">
            <input type="submit" value="Add Bookmark" className="button small" style={formButtonStyles} />
          </div>
        </div>
      </form>
    );
  }
});
var Bookmark = React.createClass({
  render: function() {
    var categoryNodes = (this.props.categories || []).map(function(category) {
      var categoryStyles = { marginLeft: '5px' };
      return (
        <span className="bookmarkCategory label" style={categoryStyles}>{category}</span>
      );
    });
    return (
      <div className="bookmark">
        <strong>{this.props.title}: </strong>
        <a href={this.props.url} target="_blank">{this.props.url}</a>
        <div className="bookmarkCategories">
          {categoryNodes}
        </div>
      </div>
    );
  }
});
React.render(<AppContainer />, document.getElementById('app'));
