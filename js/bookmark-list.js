var BookmarkList = React.createClass({
  render: function() {
    var bookmarkNodes = this.props.bookmarks.map(function(bookmark) {
      return (
        <BookmarkRow url={bookmark.val.url} title={bookmark.val.title} categories={bookmark.val.categories} uid={bookmark.uid} authData={this.props.authData} />
      );
    }.bind(this));
    return (
      <div className="bookmarkList">
        {bookmarkNodes}
      </div>
    );
  }
});
