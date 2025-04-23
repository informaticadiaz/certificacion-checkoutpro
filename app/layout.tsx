import { CartProvider } from './context/CartContext';
import './globals.css';
export const metadata = {
  title: 'Certificación Checkout Pro',
  description: 'Tienda para certificación de Mercado Pago',
};
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}