var Bookmark = React.createClass({
  render: function() {
    var categoryNodes = (this.props.categories || []).map(function(category) {
      var categoryStyles = { marginLeft: '5px' };
      return (
        <span className="bookmarkCategory label" style={categoryStyles}>{category}</span>
      );
    });
    var editButtons = (
      <div className="small-12 medium-2 columns">
        <BookmarkDeleteButton uid={this.props.uid} authData={this.props.authData} />
        <div className="button tiny" onClick={this.props.editCallback}>Edit</div>
      </div>
    );
    return (
      <div className="bookmark row">
        <div className="small-12 medium-4 columns">
          <strong>{this.props.title}</strong>
        </div>
        <div className="small-12 medium-4 columns">
          <a href={this.props.url} target="_blank">{this.props.url}</a>
        </div>
        <div className="small-12 medium-4 columns">
          <div className="bookmarkCategories">
            {categoryNodes}
          </div>
        </div>
        {this.props.authData ? editButtons : ""}
      </div>
    );
  }
});
