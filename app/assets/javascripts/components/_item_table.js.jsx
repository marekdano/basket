class ItemTable extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [
        { id: 1, name: 'Beer', price: 1.49},
        { id: 2, name: 'Wine', price: 9.99}
      ]
    }
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
    var items = this.state.items.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.price}</td> 
          <td><a href="/items" className="btn btn-info">Add to basket</a></td>
        </tr>
      )
    });
    
    return (
      <table className="table table-striped">
        <thead>
          <th>Name</th>
          <th>Price</th>
          <th></th>
        </thead>
        <tbody>
          {items} 
        </tbody>
      </table>
    );
  }
}