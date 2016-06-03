class NewItem extends React.Component {
  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    return (
      <div>
        <form className="form-inline" novalidate>
          <div className="form-group">
            <input className="form-control" ref='name' type="text" placeholder='Enter the name of an item' />
          </div>
          <div className="form-group">
            <input className="form-control" ref='price' type="number" pattern="[0-9]*" inputmode="numeric" placeholder='0.01' /> 
          </div>
          <button className='btn btn-success' onClick={this._handleClick}>Submit</button>
        </form>
      </div>
    )
  }

  _handleClick() {
    const name = this.refs.name.value;
    const price = this.refs.price.value;

    console.log(`Name is ${name} and price is ${price}`); 

    $.ajax({
      url: '/api/v1/items',
      type: 'POST',
      data: { item: { name,  price } },
      success: (item) => {
          this.props.handleSubmit(item);
          this.refs.name.value = '';
          this.refs.price.value = '';
      }
    })
  }
}