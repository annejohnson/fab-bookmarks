var NewBookmarkForm = React.createClass({
  getInitialState: function() {
    return { error: null };
  },
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
    var bookmarkError = getBookmarkError(title, url);
    this.setState({ error: bookmarkError });
    if (bookmarkError)
      return;
    bookmarksDatabase.child(this.props.authData.uid).push({ title: title, url: url, categories: categories });
    this.refs.title.getDOMNode().value = '';
    this.refs.categories.getDOMNode().value = '';
    this.refs.url.getDOMNode().value = 'http://';
  },
  render: function() {
    var errorNotification = this.state.error ? (
      <div className="card-panel" style={formErrorStyles}>{this.state.error}</div>
    ) : "";
    return (
      <form className="bookmarkForm card-panel l10 offset-l1 col" onSubmit={this.handleSubmit} style={formStyles}>
        <h5 className="center-align" style={formHeaderStyles}>Add a New Bookmark:</h5>
        {errorNotification}
        <div className="row">
          <div className="s6 col">
            <input type="text" placeholder="Title" ref="title" />
          </div>
          <div className="s6 col">
            <input type="text" placeholder="Categories (comma-separated)" ref="categories" />
          </div>
        </div>
        <div className="row">
          <div className="s12 col">
            <input type="text" placeholder="URL" ref="url" />
          </div>
        </div>
        <div className="row">
          <div className="s12 col center-align">
            <input type="submit" value="Add Bookmark" className="waves-effect waves-light btn" style={formButtonStyles} />
          </div>
        </div>
      </form>
    );
  }
});
