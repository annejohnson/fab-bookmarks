var EditBookmarkForm = React.createClass({
  getInitialState: function() {
    return { error: null };
  },
  componentDidMount: function() {
    this.refs.title.getDOMNode().value = this.props.title;
    this.refs.categories.getDOMNode().value = this.props.categories ?
      this.props.categories.join(', ') :
      '';
    this.refs.url.getDOMNode().value = this.props.url;
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
    bookmarksDatabase.child(this.props.uid).set({ title: title, url: url, categories: categories }, this.props.saveCallback);
  },
  render: function() {
    var errorNotification = this.state.error ? (
      <div className="alert-box alert" style={formErrorStyles}>{this.state.error}</div>
    ) : "";
    return (
      <form className="bookmarkForm panel large-10 large-centered columns" onSubmit={this.handleSubmit} style={formStyles}>
        <h5 className="text-center" style={formHeaderStyles}>Edit Bookmark:</h5>
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
            <input type="submit" value="Update Bookmark" className="button small" style={formButtonStyles} />
          </div>
        </div>
      </form>
    );
  }
});
