var bookmarkDeleteButtonStyles = {
  cursor: 'pointer'
};
var BookmarkDeleteButton = React.createClass({
  handleClick: function() {
    bookmarksDatabase.child(this.props.authData.uid).child(this.props.uid).remove();
  },
  render: function() {
    return (
      <a href="javascript:void(0)" className="btn-floating waves-effect waves-light red" onClick={this.handleClick} style={bookmarkDeleteButtonStyles}>
        <i className="mdi-action-delete"></i>
      </a>
    );
  }
});
