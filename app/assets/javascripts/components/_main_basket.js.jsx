class MainBasket extends React.Component {
  constructor() {
    super();

    this.state = {
      basket_id: localStorage.getItem( 'basketId' ),
      basketItems: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: `/api/v1/baskets/${this.state.basket_id}`,
      type: 'GET',
      success: (response) => {
        this.setState({
          basketItems: response
        })
      }
    })
  }

  render() {

    return (
      <div>
        <p>I am in the basket view.</p>
        <BasketTable basketItems={this.state.basketItems} />
        <button className="btn btn-danger" onClick={this._handleDeleteBasket.bind(this)}>Delete basket</button>
      </div>
    )
  }

  _handleDeleteBasket() {
    $.ajax({
      url: `/api/v1/baskets/${this.state.basket_id}`,
      type: 'DELETE',
      success: () => {
        localStorage.setItem('basketId', '');
        this.setState({ basket_id: '', 
                        basketItems: []   
                     });
      }
    })
  }
}