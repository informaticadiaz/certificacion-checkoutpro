'use client';
import Link from 'next/link';
export default function Failure() {
  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <h1 className="text-xl font-bold mb-2">Pago Rechazado</h1>
        <p>Lo sentimos, tu pago no pudo ser procesado.</p>
      </div>
      
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-lg font-semibold mb-4">¿Qué pasó?</h2>
        <p className="mb-4">
          Tu pago ha sido rechazado. Esto puede deberse a varias razones:
        </p>
        
        <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
          <li>Fondos insuficientes en la tarjeta</li>
          <li>Datos de la tarjeta incorrectos</li>
          <li>La tarjeta está vencida</li>
          <li>La operación fue rechazada por el banco emisor</li>
        </ul>
        
        <div className="border-t pt-4 mt-4 flex flex-col gap-2">
          <Link
            href="/cart"
            className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Intentar nuevamente
          </Link>
          <Link
            href="/"
            className="block text-center border border-blue-500 text-blue-500 py-2 px-4 rounded"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
}