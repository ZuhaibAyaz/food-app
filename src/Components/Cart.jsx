import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeItem } from '../utils/cartSlice';
import { CDN_URL } from '../utils/constants';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Group the cart items by ID and count the occurrences
  const groupedCartItems = cartItems.reduce((acc, item) => {
    const itemId = item.card.info.id;
    if (!acc[itemId]) {
      acc[itemId] = { ...item, quantity: 1 }; // Initialize with quantity 1
    } else {
      acc[itemId].quantity += 1; // Increment quantity if item already exists
    }
    return acc;
  }, {});

  // Convert the grouped object back to an array
  const uniqueCartItems = Object.values(groupedCartItems);

  // Calculate total price based on quantity
  const totalPrice = uniqueCartItems.reduce((total, item) => {
    const itemPrice =
      (item.card.info.price || item.card.info.defaultPrice) / 100;
    return total + itemPrice * item.quantity;
  }, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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
        {uniqueCartItems.length > 0 ? (
          uniqueCartItems.map((item) => (
            <div key={item.card.info.id} className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                {/* Image rendering */}
                <img
                  src={`${CDN_URL}${item.card.info.imageId}`} // Construct the image URL using CDN_URL
                  alt={item.card.info.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <h2 className="font-bold  w-[120px] truncate md:w-full">{item.card.info.name}</h2>
                  
                  <p className='text-left font-semibold'>₹{(item.card.info.price || item.card.info.defaultPrice) / 100}</p>
                  <p className='text-left font-semibold'>Quantity: {item.quantity}</p>
                  
                </div>
              </div>
              <div className=''>
              <button
                className="p-2 bg-red-500 text-white rounded"
                onClick={() => dispatch(removeItem(item))}
              >
                Remove
              </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <h2 className="font-bold mt-4">Total Price: ₹{totalPrice}</h2>
      </div>
    </div>
  );
};

export default Cart;
