var BookmarkList = React.createClass({
  render: function() {
    var bookmarkNodes = this.props.bookmarks.map(function(bookmark) {
      return (
        <Bookmark url={bookmark.val.url} title={bookmark.val.title} categories={bookmark.val.categories} uid={bookmark.uid} />
      );
    });
    return (
      <div className="bookmarkList">
        {bookmarkNodes}
      </div>
    );
  }
});
