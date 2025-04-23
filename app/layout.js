import { CartProvider } from './context/CartContext';
import './globals.css';
export const metadata = {
  title: 'Certificación Checkout Pro',
  description: 'Tienda para certificación de Mercado Pago',
};
export default function RootLayout({ children }) {
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