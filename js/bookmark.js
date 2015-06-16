var Bookmark = React.createClass({
  render: function() {
    var categoryNodes = (this.props.categories || []).map(function(category) {
      return (
        <Category categoryName={category} handleChooseCategory={this.props.handleChooseCategory} />
      );
    }.bind(this));
    var editButtons = (
      <span>
        <a href="javascript:void(0)" onClick={this.props.editCallback}>
          <i className="mdi-content-create small"></i>
        </a>
        <BookmarkDeleteButton uid={this.props.uid} authData={this.props.authData} />
      </span>
    );
    return (
      <div className="bookmark row">
        <div className="s12 m5 col">
          <a href={this.props.url} target="_blank"><strong>{this.props.title}</strong></a>
        </div>
        <div className="s12 m5 col">
          <div className="bookmarkCategories">
            {categoryNodes}
          </div>
        </div>
        <div className="s12 m2 col right-align">
          {this.props.authData ? editButtons : ""}
        </div>
      </div>
    );
  }
});
