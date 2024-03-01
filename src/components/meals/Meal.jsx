import url from "../../assets/beef-tacos.jpg";

export default function Meal({ name, price, description, image, onAddToCart }) {
  return (
    <article className="meal-item">
      <img src={`${url}/${image}`} alt="food" />
      <h3>{name}</h3>
      <div className="meal-item-price">${price}</div>
      <p className="meal-item-description">{description}</p>
      <div className="meal-item-actions">
        <button type="button" onClick={() => onAddToCart()}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}
