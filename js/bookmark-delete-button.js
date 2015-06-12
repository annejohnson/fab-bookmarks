var BookmarkDeleteButton = React.createClass({
  handleClick: function() {
    bookmarksDatabase.child(this.props.uid).remove();
  },
  render: function() {
    return (
      <span className="label alert" onClick={this.handleClick}>
        x
      </span>
    );
  }
});
