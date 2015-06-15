var ErrorNotification = React.createClass({
  render: function() {
    return (
      <div className="red-text">
        {this.props.message}
      </div>
    );
  }
});
