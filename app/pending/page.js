'use client';
import Link from 'next/link';
export default function Pending() {
  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
        <h1 className="text-xl font-bold mb-2">Pago Pendiente</h1>
        <p>Tu pago está siendo procesado.</p>
      </div>
      
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Estado de la transacción</h2>
        <p className="mb-4">
          Tu pago está pendiente de confirmación. Esto puede deberse a que:
        </p>
        
        <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
          <li>Elegiste un método de pago que requiere aprobación adicional</li>
          <li>El método de pago seleccionado requiere completar pasos adicionales</li>
          <li>El banco está procesando la transacción</li>
        </ul>
        
        <p className="text-sm mb-4">
          Recibirás una notificación por correo electrónico cuando el pago sea confirmado.
        </p>
        
        <div className="border-t pt-4 mt-4">
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
