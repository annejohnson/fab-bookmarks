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
