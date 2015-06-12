var bookmarkDeleteButtonStyles = {
  cursor: 'pointer'
};
var BookmarkDeleteButton = React.createClass({
  handleClick: function() {
    bookmarksDatabase.child(this.props.uid).remove();
  },
  render: function() {
    return (
      <span className="label alert" onClick={this.handleClick} style={bookmarkDeleteButtonStyles}>
        x
      </span>
    );
  }
});
