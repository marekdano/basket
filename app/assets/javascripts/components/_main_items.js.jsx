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
          onUpdate={this._handleUpdate}/>
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
        console.log('successfully removed item');
      }
    });
  }

  _removeItem(id) {
    const newItems = this.state.items.filter((item) => {
      return item.id != id;
    });

    this.setState({ items: newItems });
  }

  _handleUpdate() {
    console.log('update the item');
  }
}