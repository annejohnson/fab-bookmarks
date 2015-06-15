var Category = React.createClass({
  handleChooseCategory: function() {
    this.props.handleChooseCategory(this.props.categoryName);
  },
  render: function() {
    var categoryStyles = { marginLeft: '5px' };
    return (
      <a href="javascript:void(0)" className="waves-effect waves-light btn" style={categoryStyles} onClick={this.handleChooseCategory}>{this.props.categoryName}</a>
    );
  }
});
