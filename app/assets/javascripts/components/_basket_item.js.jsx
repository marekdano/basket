class BasketItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.basketItem.item.name}</td>
        <td>{this.props.basketItem.item.price}</td>
        <td>{this.props.basketItem.quantity}</td>
        <td>Delete</td>
      </tr>
    )
  }
}