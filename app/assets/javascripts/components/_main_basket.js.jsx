class MainBasket extends React.Component {
  constructor() {
    super();

    this.state = {
      basketId: localStorage.getItem( 'basketId' ),
      basketItems: []
    }

    this._handleDelete = this._handleDelete.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount() {
    this._getBasketItems();
  }

  _handleDelete(item) {
    if(confirm("Are you sure to delete this item?")) {

      $.ajax({
        url: `/api/v1/basket_items/${item.id}`,
        type: 'DELETE',
        success: () => {
          console.log('successfully item removed');

          const basketItems = this.state.basketItems.filter((i) => {
            return i.id != item.id;
          });

          this.setState({ basketItems: basketItems }); 
        }
      })
    }
  }
  
  _handleChange(item) {
    console.log("Handle Quantity change.");
    if(item.quantity < 1) {
      console.log(item.quantity);
      item.quantity = 1;
    } 

    $.ajax({
        url: `/api/v1/basket_items/${item.id}`,
        type: 'PUT',
        data: { basket_item: item },
        success: () => {
          console.log("Item updated");
          this._updateBasketItems();
        }
      })
  }

  _updateBasketItems() {
    this._getBasketItems();
  }

  _getBasketItems() {
    $.ajax({
      url: `/api/v1/baskets/${this.state.basketId}`,
      type: 'GET',
      success: (response) => {
        this.setState({
          basketItems: response
        })
        console.log(this.state.basketItems);
      }
    })
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-uppercase">Basket</h1>
        <h4>The list of item added into the basket.</h4>
        <BasketTable basketItems={this.state.basketItems} 
                     onBasketItemDelete={this._handleDelete} 
                     onUpdateQuantity={this._handleChange} />
        <a href="/"><i className="fa fa-angle-left"></i> Back</a>
      </div>
    )
  }

}