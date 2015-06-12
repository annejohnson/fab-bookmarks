var BookmarkRow = React.createClass({
  getInitialState: function() {
    return { editing: false };
  },
  render: function() {
    return this.state.editing ? (
      <EditBookmarkForm title={this.props.title} url={this.props.url} categories={this.props.categories} uid={this.props.uid} />
    ) : (
      <Bookmark title={this.props.title} url={this.props.url} categories={this.props.categories} uid={this.props.uid} />
    );
  }
});
