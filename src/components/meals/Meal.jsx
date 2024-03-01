// const components = import.meta.glob("../../assets/*.jpg");
// const componentsKeys = Object.keys(components);


// let x = [];
  

// for (const path in components) {
//   const component = components[path]();
//   x.push(component);
//   console.log(component.default);
// }



export default function Meal({ name, price, description, image, onAddToCart }) {
  
  // const url = componentsKeys.filter((comp) => comp === image);
  // const url = x[0].default;
  

  return (
    <article className="meal-item">
      <img src={image} alt="food" />
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
