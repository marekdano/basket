class MainItems extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [
        { id: 1, name: 'Beer', price: 1.49},
        { id: 2, name: 'Wine', price: 9.99}
      ]
    }

    this._handleSubmit = this._handleSubmit.bind(this); 
    this._handleDelete = this._handleDelete.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
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
    return (
      <div className="container">
        <h1 className="text-uppercase">Items</h1>
        <NewItem handleSubmit={this._handleSubmit} />
        <ItemTable items={this.state.items}
                   handleDelete={this._handleDelete}
                   onUpdate={this._handleUpdate} />
      </div>
    )
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