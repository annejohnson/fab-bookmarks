var Bookmark = React.createClass({
  render: function() {
    var categoryNodes = (this.props.categories || []).map(function(category) {
      var categoryStyles = { marginLeft: '5px' };
      return (
        <span className="bookmarkCategory label" style={categoryStyles}>{category}</span>
      );
    });
    return (
      <div className="bookmark">
        <strong>{this.props.title}: </strong>
        <a href={this.props.url} target="_blank">{this.props.url}</a>
        <div className="bookmarkCategories">
          {categoryNodes}
        </div>
      </div>
    );
  }
});
