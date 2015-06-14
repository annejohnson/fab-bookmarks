var BookmarkList = React.createClass({
  getInitialState: function() {
    return { categoryFilter: null };
  },
  setCategoryFilter: function(filter) {
    this.setState({ categoryFilter: (typeof filter === "string" ? filter : null) });
  },
  render: function() {
    var showAllCategoriesHtml = this.state.categoryFilter ? (
      <a href="javascript:void(0)" onClick={this.setCategoryFilter}>Show All Categories</a>
    ) : "";
    var bookmarksHtml = this.props.bookmarks.filter(function(bookmark) {
      return (!this.state.categoryFilter ||
              bookmark.val.categories.indexOf(this.state.categoryFilter) > -1);
    }.bind(this)).map(function(bookmark) {
      return (
        <BookmarkRow url={bookmark.val.url} title={bookmark.val.title} categories={bookmark.val.categories} uid={bookmark.uid} authData={this.props.authData} handleChooseCategory={this.setCategoryFilter} />
      );
    }.bind(this));
    return (
      <div>
        {showAllCategoriesHtml}
        <div className="bookmarkList">
          {bookmarksHtml}
        </div>
      </div>
    );
  }
});
