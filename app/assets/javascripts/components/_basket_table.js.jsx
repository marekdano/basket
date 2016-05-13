class BasketTable extends React.Component {
  render() {
    basketItems = this.props.basketItems.map((item) => {
      return (
        <BasketItem basketItem={item} 
                    key={item.id} 
                    handleDelete={this._handleDelete.bind(this, item)} 
                    handleChange={this._handleChange.bind(this)}/>
      )
    });

    return (
      <table className="table table-striped">
        <thead>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </thead>
        <tbody>
          {basketItems} 
        </tbody>
      </table>
    )
  }

  _handleDelete(item) {
    this.props.onBasketItemDelete(item);
  }
  

  _handleChange(item) {
    this.props.onUpdateQuantity(item);
  }
}