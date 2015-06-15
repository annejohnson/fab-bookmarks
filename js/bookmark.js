var Bookmark = React.createClass({
  render: function() {
    var categoryNodes = (this.props.categories || []).map(function(category) {
      return (
        <Category categoryName={category} handleChooseCategory={this.props.handleChooseCategory} />
      );
    }.bind(this));
    var editButtons = (
      <div className="right-align">
        <a href="javascript:void(0)" onClick={this.props.editCallback}>
          <i className="mdi-content-create small"></i>
        </a>
        <BookmarkDeleteButton uid={this.props.uid} authData={this.props.authData} />
      </div>
    );
    return (
      <div className="bookmark row">
        <div className="s12 m3 col">
          <strong>{this.props.title}</strong>
        </div>
        <div className="s12 m4 col">
          <a href={this.props.url} target="_blank">{this.props.url}</a>
        </div>
        <div className="s12 m3 col">
          <div className="bookmarkCategories">
            {categoryNodes}
          </div>
        </div>
        <div className="s12 m2 col">
          {this.props.authData ? editButtons : ""}
        </div>
      </div>
    );
  }
});
