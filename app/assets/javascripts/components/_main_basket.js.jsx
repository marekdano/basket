class MainBasket extends React.Component {
  constructor() {
    super();

    this.state = {
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
      </div>
    )
  }


}