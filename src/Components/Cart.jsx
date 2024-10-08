import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utils/cartSlice';
import ItemCards from './ItemCards';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].card.info.price / 100 || cartItems[i].card.info.defaultPrice / 100 ;
  }

  return (
    <div className="text-center p-4 m-4">
      <h1 className="font-bold text-xl">Cart</h1>
      <div className="xl:w-6/12 m-auto">
        <button
          className="p-2 m-2 bg-black text-white rounded-xl"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems.length > 0 ? (
          <ItemCards items={cartItems} />
        ) : (
          <p>Your cart is empty.</p>
        )}
        <h2>Total Price: {totalPrice}</h2>
      </div>
    </div>
  );
};

export default Cart;
