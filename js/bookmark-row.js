var BookmarkRow = React.createClass({
  getInitialState: function() {
    return { editing: false };
  },
  switchState: function() {
    this.setState({ editing: !this.state.editing });
  },
  render: function() {
    var editBookmarkHtml = (
      <EditBookmarkForm title={this.props.title} url={this.props.url} categories={this.props.categories} uid={this.props.uid} saveCallback={this.switchState} />
    );
    var viewBookmarkHtml = (
      <Bookmark title={this.props.title} url={this.props.url} categories={this.props.categories} uid={this.props.uid} editCallback={this.switchState} authData={this.props.authData} />
    );
    return (
      <div className="bookmarkRow">
        { this.state.editing ? editBookmarkHtml : viewBookmarkHtml }
      </div>
    );
  }
});
