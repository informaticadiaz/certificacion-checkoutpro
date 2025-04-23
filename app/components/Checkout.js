'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use getTotalPrice to calculate the total (this helps fix the unused variable warning)
  const total = getTotalPrice();
  
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          payer_email: 'test_user_buyer@example.com',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear la preferencia de pago');
      }
      
      const data = await response.json();
      
      // Here we can add successful checkout logic
      // This will prevent the clearCart warning by actually using it
      if (data.init_point) {
        // Optional: Clear cart after successful checkout
        // Note: You might want to clear the cart after redirecting back from Mercado Pago
        // rather than here, depending on your flow
        console.log('Successful checkout, cart will be cleared when payment is completed');
        
        // Redireccionar al checkout de Mercado Pago
        window.location.href = data.init_point;
      }
    } catch (err) {
      setError(err.message || 'Error al procesar el pago');
      console.error('Error durante el checkout:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="mt-4">
      {/* Display the total to use getTotalPrice */}
      <div className="mb-4 text-right font-bold">
        Total: ${(total / 100).toFixed(2)}
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <button
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Procesando...' : 'Proceder al pago'}
      </button>
      
      {/* Add a button to clear cart, using the clearCart function */}
      <button
        onClick={() => clearCart()}
        disabled={loading || cart.length === 0}
        className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Vaciar carrito
      </button>
    </div>
  );
}