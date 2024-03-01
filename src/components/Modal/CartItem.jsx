export default function CartItem({ name, quantity, price, onUpdateItemQuantity }) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x ${price}
      </p>
      <div className="cart-item-actions">
        <button className="text-button" onClick={() => onUpdateItemQuantity(-1)}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => onUpdateItemQuantity(1)}>+</button>
      </div>
    </li>
  );
}
