var Category = React.createClass({
  handleChooseCategory: function() {
    this.props.handleChooseCategory(this.props.categoryName);
  },
  render: function() {
    var categoryStyles = { marginLeft: '5px' };
    return (
      <span className="bookmarkCategory label" style={categoryStyles} onClick={this.handleChooseCategory}>{this.props.categoryName}</span>
    );
  }
});
