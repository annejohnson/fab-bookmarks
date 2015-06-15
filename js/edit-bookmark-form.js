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
    bookmarksDatabase.child(this.props.authData.uid).child(this.props.uid).set({ title: title, url: url, categories: categories }, this.props.saveCallback);
  },
  render: function() {
    var errorNotification = this.state.error ? (
      <div className="card-panel red lighten-2" style={formErrorStyles}>{this.state.error}</div>
    ) : "";
    return (
      <form className="bookmarkForm card-panel s12 l10 offset-l2 col" onSubmit={this.handleSubmit} style={formStyles}>
        <h5 className="center-align" style={formHeaderStyles}>Edit Bookmark:</h5>
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
            <button type="submit" className="btn-floating btn-large waves-effect waves-light red" style={formButtonStyles}>Update Bookmark</button>
          </div>
        </div>
      </form>
    );
  }
});
