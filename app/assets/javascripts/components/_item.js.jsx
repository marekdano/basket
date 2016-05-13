class Item extends React.Component {
  constructor() {
    super();

    this.state = {
      editable: false
    }

    this._handleEditClick = this._handleEditClick.bind(this);
  }

  render() {
    const name = this.state.editable ? <input type="text" ref="name" defaultValue={this.props.item.name} /> : <p>{this.props.item.name}</p>;
    const price = this.state.editable ? <input type="number" ref="price" defaultValue={this.props.item.price} /> : <p>{this.props.item.price}</p>;
    const addButton = this.props.basketId ? <button className="btn btn-info" onClick={this.props.handleAddToBasket}>Add to basket</button> : ''

    return (
      <tr>
      <td>{name}</td>
      <td>{price}</td> 
      <td><button className="btn btn-info" onClick={this._handleEditClick}>{this.state.editable ? 'Submit' : 'Edit' }</button></td>
      <td><button className="btn btn-danger" onClick={this.props.handleDelete}>Delete</button></td>
      <td>{addButton}</td>
      </tr>
    )
  }

  _handleEditClick() {
    console.log('edit item clicked'); 
    const item = {id: this.props.item.id};
    console.log(item);
    if(this.state.editable) {
      const name = this.refs.name.value;
      console.log(name);
      const price = this.refs.price.value;
      console.log(price);
      const id = this.props.item.id;
      const item = { id, name, price };
      console.log(item);
      this.props.handleUpdate(item); 
    }
 
    this.setState({ editable: !this.state.editable });
  }
}