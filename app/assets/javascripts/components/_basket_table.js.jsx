class BasketTable extends React.Component {
  render() {
    basketItems = this.props.basketItems.map((item) => {
      return (
        <BasketItem basketItem={item} 
                    key={item.id} />
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
}