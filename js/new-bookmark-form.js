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
    bookmarksDatabase.child(this.props.authData.uid).push(
      { title: title, url: url, categories: categories },
      function(error) {
        if (error)
          this.setState({ error: error.message });
        else
          $('#modal-new-bookmark-form').closeModal();
      }.bind(this)
    );
    this.refs.title.getDOMNode().value = '';
    this.refs.categories.getDOMNode().value = '';
    this.refs.url.getDOMNode().value = 'http://';
  },
  render: function() {
    var errorNotification = this.state.error ? (
      <ErrorNotification message={this.state.error} />
    ) : "";
    return (
      <form className="bookmarkForm modal collection" onSubmit={this.handleSubmit} style={formStyles} id="modal-new-bookmark-form">
        <div className="collection-item">
          <h5 className="center-align" style={formHeaderStyles}>Add a New Bookmark:</h5>
          {errorNotification}
          <div className="row">
            <div className="input-field s6 col">
              <input type="text" id="new-title" ref="title" />
              <label for="new-title">Title</label>
            </div>
            <div className="input-field s6 col">
              <input type="text" id="new-categories" ref="categories" />
              <label for="new-categories">Categories (comma-separated)</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field s12 col">
              <input type="text" placeholder="http://" id="new-url" ref="url" />
              <label for="new-url" className="active">URL</label>
            </div>
          </div>
          <div className="row">
            <div className="s12 col center-align">
              <button type="submit" className="waves-effect waves-light btn" style={formButtonStyles}>Add Bookmark</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
});
