'use client';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import { initMercadoPago } from '@mercadopago/sdk-react';
export default function Cart() {
  const { cart, getTotalPrice } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          payer_email: 'test_user_buyer@example.com', // Email del comprador de prueba 
        }),
      });
      
      const data = await response.json();
      setPreferenceId(data.preferenceId);
      
      // Redirigir a la página de checkout de Mercado Pago
      window.location.href = data.init_point;
    } catch (error) {
      console.error('Error al crear preferencia:', error);
      alert('Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="container mx-auto p-4">
      <header className="mb-8">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Volver a la tienda
        </Link>
        <h1 className="text-2xl font-bold mt-2">Carrito de compras</h1>
      </header>
      
      {cart.length === 0 ? (
        <p className="text-center py-8">El carrito está vacío</p>
      ) : (
        <>
          <div className="border rounded-lg p-4 mb-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2 pb-2 border-b">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-bold">${item.price / 100}</p>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 pt-2 border-t">
              <h3 className="font-bold">Total:</h3>
              <p className="font-bold">${getTotalPrice() / 100}</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              {loading ? 'Procesando...' : 'Proceder al pago'}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
