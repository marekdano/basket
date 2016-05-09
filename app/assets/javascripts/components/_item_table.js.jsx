class ItemTable extends React.Component {

  render() {
    var items = this.props.items.map((item) => {
      return (
          <Item item={item}
            handleDelete={this._handleDeleteClick.bind(this, item.id)}
            handleUpdate={this._onUpdate.bind(this)} />       
      )
    });
    
    return (
      <table className="table table-striped">
        <thead>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </thead>
        <tbody>
          {items} 
        </tbody>
      </table>
    );
  }

  _handleDeleteClick(id) {
    console.log('delete item clicked');
    this.props.handleDelete(id);
  }

  _onUpdate(item) {
    console.log('update item in table');
    this.props.onUpdate(item);
  } 
}