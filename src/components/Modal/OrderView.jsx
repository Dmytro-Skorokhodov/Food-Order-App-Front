import Meal from "../meals/Meal";

export default function OrderView({ order, backToOrders }) {
  const orderMeals = JSON.parse(order.meals);

  return (
    <div className="order-view">
      <h2 className="order-view__title">Order #{order.id}</h2>
      <p className="order-view__details details-order-view">
        <h2 className="details-order-view__title">Details</h2>
        <div className="details-order-view__block block-details-order-view">
          <label className="details-order-view__label">Name</label>
          <div className="details-order-view__value">{order.name}</div>
        </div>
        <div className="details-order-view__block block-details-order-view">
          <label className="details-order-view__label">Email</label>
          <div className="details-order-view__value">{order.email}</div>
        </div>
        <div className="details-order-view__block block-details-order-view">
          <label className="details-order-view__label">City</label>
          <div className="details-order-view__value">{order.city}</div>
        </div>
        <div className="details-order-view__block block-details-order-view">
          <label className="details-order-view__label">Street</label>
          <div className="details-order-view__value">{order.street}</div>
        </div>
        <div className="details-order-view__block block-details-order-view">
          <label className="details-order-view__label">Postal-Code</label>
          <div className="details-order-view__value">{order.postal_code}</div>
        </div>
        <div className="details-order-view__block-meals meals-block-details-order-view">
          <label className="meals-block-details-order-view__label">Meals</label>
          <ul className="meals-block-details-order-view__list">
            {orderMeals.map((meal) => (
              <li className="details-meal">
                <div className="details-meal__title">
                  {meal.name} - ${meal.price}
                </div>
                <div className="details-meal__amount amount-details-meal">
                  {/* <div className="amount-details-meal__title">Amount</div> */}
                  <div className="amount-details-meal__value">{meal.quantity}</div>
                </div>
              </li>
            ))}
          </ul>
          
        </div>
      </p>
      <button className="order-view__close button" onClick={() => backToOrders()}>
        Back
      </button>
    </div>
  );
}
