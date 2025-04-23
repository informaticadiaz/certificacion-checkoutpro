'use client';
import Product from './components/Product';
import { product } from './models/product';
import Link from 'next/link';
import { useCart } from './context/CartContext';
export default function Home() {
  const { cart } = useCart();
  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Mi Tienda para Certificación MP</h1>
        <Link href="/cart" className="bg-blue-500 text-white p-2 rounded flex items-center">
          Carrito ({cart.length})
        </Link>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Product product={product} />
      </div>
    </main>
  );
}