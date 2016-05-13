class MainItems extends React.Component {
  constructor() {
    super();

    this.state = {
      basketId: localStorage.getItem( 'basketId' ) || 0,
      items: []
    }

    this._handleSubmit = this._handleSubmit.bind(this); 
    this._handleDelete = this._handleDelete.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleCreateBasket = this._handleCreateBasket.bind(this);
    this._handleAddToBasket = this._handleAddToBasket.bind(this);
  }

  componentDidMount() {
    $.getJSON(
      '/api/v1/items.json', 
      (response) => { 
        this.setState({ 
          items: response 
        }) 
      }
    )
  }

  render() {
    var basketButton, deleteBasketButton;
    if(this.state.basketId) {
      basketButton = <a href="/basket" className="btn btn-info">Basket</a>;
      deleteBasketButton = <button className="btn btn-danger" onClick={this._handleDeleteBasket.bind(this)}>Delete basket</button>
    } else {
      basketButton = <button className="btn btn-info" onClick={this._handleCreateBasket}>New basket</button>;
    }
    
    return (
      <div className="container">
        <div className="inline pull-left">
          {basketButton}
          {deleteBasketButton}
        </div>
        <br />
        <h1 className="text-uppercase">Items</h1>
        <NewItem handleSubmit={this._handleSubmit} />
        <ItemTable items={this.state.items}
                   basketId={this.state.basketId}
                   handleDelete={this._handleDelete}
                   onUpdate={this._handleUpdate} 
                   onAddToBasket={this._handleAddToBasket} />
      </div>
    )
  }

  _handleCreateBasket() {
    $.ajax({
      url: '/api/v1/baskets',
      type: 'POST',
      success: (response) => {
        this.setState({basketId: response.id});
        localStorage.setItem( 'basketId', response.id );
      }
    })
  }
  
  _handleAddToBasket(item) {
    $.ajax({
      url: `/api/v1/basket_items`,
      type: 'POST',
      data: { 
              basket_item: 
              { 
                basket_id: this.state.basketId,
                item_id: item.id,
                quantity: 1   
              }
            },  
      success: (response) => {
        console.log(response);
      }
    })
  }

  _handleSubmit(item) {
    const newState = this.state.items.concat([item]);
    this.setState({ items: newState }) 
  }

  _handleDelete(id) {
    $.ajax({
      url: `/api/v1/items/${id}`,
      type: 'DELETE',
      success: () => {
        this._removeItem(id);
        console.log('successfully item removed');
      }
    });
  }

  _removeItem(id) {
    //const items = this._modifyItems(id);
    const newItems = this.state.items.filter((item) => {
      return item.id != id;
    });

    this.setState({ items: newItems });
  }

  _handleUpdate(item) {
    console.log('update the item');
    $.ajax({
      url: `/api/v1/items/${item.id}`,
      type: 'PUT',
      data: { item },
      success: () => {
        this._updateItems(item);
        console.log('successfully item updated');
      }
    })
  }

  _updateItems(item) {
    //let items = this._modifyItems(item);
    let items = this.state.items.filter((i) => {
      return i.id != item.id
    });
    items.push(item);

    this.setState({ items });
  }

  _handleDeleteBasket() {
    $.ajax({
      url: `/api/v1/baskets/${this.state.basketId}`,
      type: 'DELETE',
      success: () => {
        localStorage.setItem('basketId', '');
        this.setState({ basketId: '' });
      }
    })
  }



  // _modifyItems(item) {
  //   console.log(item);
  //   let newItems = [...this.state.items];
  //   console.log(newItems);
  //   const itemIndex = newItems.indexOf(item);
  //   console.log(itemIndex);
  //   newItems.splice(itemIndex, 1);
  //   console.log(newItems);
  //   return newItems;
  // }

}