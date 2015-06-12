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
