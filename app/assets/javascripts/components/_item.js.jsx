class Item extends React.Component {
  render() {
    return (
      <tr key={this.props.item.id}>
      <td>{this.props.item.name}</td>
      <td>{this.props.item.price}</td> 
      <td><button className="btn btn-info" onClick={this._handleEditClick.bind(this)}>Edit</button></td>
      <td><button className="btn btn-danger" onClick={this.props.handleDelete}>Delete</button></td>
      <td><a href="/items" className="btn btn-info">Add to basket</a></td>
      </tr>
    )
  }

  _handleEditClick() {
    console.log('edit item clicked'); 
    const item = {id: this.props.item.id};

    this.props.handleUpdate(item);
  }
}