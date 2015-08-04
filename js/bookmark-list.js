var BookmarkList = React.createClass({
  getInitialState: function() {
    return { categoryFilter: null };
  },
  setCategoryFilter: function(filter) {
    this.setState({ categoryFilter: (typeof filter === "string" ? filter : null) });
  },
  openNewBookmarkForm: function() {
    $('#modal-new-bookmark-form').openModal();
  },
  render: function() {
    var showAllCategoriesHtml = this.state.categoryFilter ? (
      <a href="javascript:void(0)" onClick={this.setCategoryFilter} className="waves-effect waves-light btn">Show All Categories</a>
    ) : "";
    var bookmarksHtml = this.props.bookmarks.filter(function(bookmark) {
      return (!this.state.categoryFilter ||
              bookmark.val.categories.indexOf(this.state.categoryFilter) > -1);
    }.bind(this)).map(function(bookmark) {
      return (
        <BookmarkRow url={bookmark.val.url} title={bookmark.val.title} categories={bookmark.val.categories} uid={bookmark.uid} authData={this.props.authData} handleChooseCategory={this.setCategoryFilter} />
      );
    }.bind(this));
    return this.props.authData ? (
      <div className="collection with-header card-panel">
        <div className="collection-header">
          <div className="row">
            <div className="s12 m8 col">
              <h5>Bookmarks</h5>
            </div>
            <div className="s12 m4 col right-align">
              {showAllCategoriesHtml}
              <a className="btn-floating waves-effect waves-light" href="javascript:void(0)" onClick={this.openNewBookmarkForm}><i className="mdi-content-add"></i></a>
            </div>
          </div>
        </div>
        {bookmarksHtml}
      </div>
    ) : (
      <div></div>
    );
  }
});
