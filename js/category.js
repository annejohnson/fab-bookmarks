var Category = React.createClass({
  handleChooseCategory: function() {
    this.props.handleChooseCategory(this.props.categoryName);
  },
  render: function() {
    var categoryStyles = {
      marginLeft: '5px',
      marginTop: '5px',
      padding: '0 10px',
      lineHeight: '24px',
      height: '24px',
      fontSize: '12px'
    };
    return (
      <a href="javascript:void(0)" className="waves-effect waves-light btn" style={categoryStyles} onClick={this.handleChooseCategory}>{this.props.categoryName}</a>
    );
  }
});
