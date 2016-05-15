class BasketItem extends React.Component {
  constructor() {
    super();

    this.state = {
      validation: 'correct'
    }
  }
  render() {
    console.log(this.props.basketItem);

    return (
      <tr>
        <td>{this.props.basketItem.item.name}</td>
        <td>{this.props.basketItem.item.price}</td>
        <td><input type="number" ref="quantity" 
                   className={this.state.validation}
                   min="1" 
                   defaultValue={this.props.basketItem.quantity} 
                   onChange={this._handleChange.bind(this)}/></td>
        <td>{this.props.basketItem.quantity}</td>
        <td><button className="btn btn-danger"
                    onClick={this.props.handleDelete}>Delete</button>
        </td>
      </tr>
    )
  }

  _handleChange() {
    const quantity = this.refs.quantity.value;
    if(quantity < 1) {
      this.setState({ validation: 'fail' });
    } else {
      this.setState({ validation: 'correct' });
    }
    
    console.log(quantity);
    const basket_item = { id: this.props.basketItem.id,
                          item_id: this.props.basketItem.item_id,
                          basket_id: this.props.basketItem.basket_id, 
                          quantity };
    console.log(basket_item);
    
    this.props.handleChange(basket_item); 
  }
}