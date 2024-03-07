export default function OrderItem({ name, id }) {
  return (
    <li className="cart-item">
      <p>
        {name} - {id}
      </p>
      <div className="cart-item-actions">
        <button className="text-button">Delete</button>
      </div>
    </li>
  );
}
