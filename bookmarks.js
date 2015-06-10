var bookmarksDatabase = new Firebase('https://fab-bookmarks.firebaseio.com/bookmarks');
var AppContainer = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return { bookmarks: [] };
  },
  componentWillMount: function() {
    this.bindAsArray(bookmarksDatabase, 'bookmarks');
  },
  render: function() {
    return (
      <div class="appContainer">
        <BookmarkList bookmarks={this.state.bookmarks} />
        <BookmarkForm />
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
      <div class="bookmarkList">
        {bookmarkNodes}
      </div>
    );
  }
});
var BookmarkForm = React.createClass({
  componentDidMount: function() {
    this.refs.title.getDOMNode().value = '';
    this.refs.categories.getDOMNode().value = '';
    this.refs.url.getDOMNode().value = 'http://';
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.getDOMNode().value.trim();
    var url = this.refs.url.getDOMNode().value.trim();
    var categories = this.refs.categories.getDOMNode().value.split(",").map(function(category) {
      return category.trim();
    }).filter(function(category) { return category; });
    if (!title || !url)
      return;
    bookmarksDatabase.push({ title: title, url: url, categories: categories });
    this.refs.title.getDOMNode().value = '';
    this.refs.categories.getDOMNode().value = '';
    this.refs.url.getDOMNode().value = 'http://';
  },
  render: function() {
    return (
      <form class="bookmarkForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Title" ref="title" />
        <input type="text" placeholder="URL" ref="url" />
        <input type="text" placeholder="Categories (comma-separated)" ref="categories" />
        <input type="submit" value="Add Bookmark" />
      </form>
    );
  }
});
var Bookmark = React.createClass({
  render: function() {
    var categoryNodes = (this.props.categories || []).map(function(category) {
      return (
        <div class="bookmarkCategory">{category}</div>
      );
    });
    return (
      <div class="bookmark">
        <strong>{this.props.title}: </strong>
        <a href={this.props.url} target="_blank">{this.props.url}</a>
        <div class="bookmarkCategories">
          {categoryNodes}
        </div>
      </div>
    );
  }
});
React.render(<AppContainer />, document.getElementById('app'));
