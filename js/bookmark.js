var Bookmark = React.createClass({
  render: function() {
    var categoryNodes = (this.props.categories || []).map(function(category) {
      return (
        <Category categoryName={category} handleChooseCategory={this.props.handleChooseCategory} />
      );
    }.bind(this));
    var editButtons = (
      <div className="s12 m2 col">
        <BookmarkDeleteButton uid={this.props.uid} authData={this.props.authData} />
        <a href="javascript:void(0)" className="btn-floating waves-effect waves-light red" onClick={this.props.editCallback}>
          <i className="mdi-content-create"></i>
        </a>
      </div>
    );
    return (
      <div className="bookmark row">
        <div className="s12 m4 col">
          <strong>{this.props.title}</strong>
        </div>
        <div className="s12 m4 col">
          <a href={this.props.url} target="_blank">{this.props.url}</a>
        </div>
        <div className="s12 m4 col">
          <div className="bookmarkCategories">
            {categoryNodes}
          </div>
        </div>
        {this.props.authData ? editButtons : ""}
      </div>
    );
  }
});
