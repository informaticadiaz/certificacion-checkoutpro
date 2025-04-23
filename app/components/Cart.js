'use client';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
export default function Cart({ isMinicart = false }) {
  const { cart, getTotalPrice } = useCart();
  
  if (isMinicart) {
    return (
      <div className="border rounded p-2 bg-white shadow-md">
        <h3 className="font-semibold mb-2">Carrito</h3>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">El carrito está vacío</p>
        ) : (
          <>
            <div className="max-h-40 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="text-sm mb-1 pb-1 border-b flex justify-between">
                  <span>{item.title}</span>
                  <span className="font-medium">${item.price / 100}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-1 border-t flex justify-between text-sm font-bold">
              <span>Total:</span>
              <span>${getTotalPrice() / 100}</span>
            </div>
            <Link href="/cart" className="block text-center bg-blue-500 text-white text-sm py-1 px-2 rounded mt-2">
              Ver carrito
            </Link>
          </>
        )}
      </div>
    );
  }
  
  return null;
}
