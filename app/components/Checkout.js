'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
export default function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
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
      
      // Redireccionar al checkout de Mercado Pago
      window.location.href = data.init_point;
    } catch (err) {
      setError(err.message || 'Error al procesar el pago');
      console.error('Error durante el checkout:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="mt-4">
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
    </div>
  );
}