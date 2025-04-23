'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
export default function Success() {
  const { clearCart } = useCart();
  
  useEffect(() => {
    // Limpiar el carrito cuando se completa una compra exitosa
    clearCart();
  }, [clearCart]);
  
  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        <h1 className="text-xl font-bold mb-2">¡Pago Aprobado!</h1>
        <p>Tu pago ha sido procesado correctamente.</p>
      </div>
      
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Detalles de la transacción</h2>
        <p className="mb-4">Tu pedido ha sido registrado y está siendo procesado.</p>
        
        <div className="border-t pt-4 mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Te enviamos un correo electrónico con los detalles de tu compra.
          </p>
          <Link
            href="/"
            className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
