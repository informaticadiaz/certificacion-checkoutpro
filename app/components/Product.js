'use client';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
export default function Product({ product }) {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    alert('Producto agregado al carrito');
  };
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="relative h-40 mb-4">
        <Image 
          src={product.image} 
          alt={product.title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded"
        />
      </div>
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p className="text-gray-600 my-2">{product.description}</p>
      <p className="text-lg font-bold mt-auto">${product.price / 100}</p>
      <button 
        onClick={handleAddToCart}
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
