import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
// Inicializa el cliente de Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});
export async function POST(request) {
  try {
    const body = await request.formData();
    
    // Obtener action e ID del webhook
    const action = body.get('action');
    const id = body.get('data.id');
    
    if (action === 'payment.created' || action === 'payment.updated') {
      // Obtener detalles del pago
      const payment = new Payment(client);
      const paymentData = await payment.get({ id });
      
      console.log('Payment ID:', id);
      console.log('Payment status:', paymentData.status);
      
      // Aquí puedes guardar el pago en tu base de datos
      // y actualizar el estado del pedido
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en webhook:', error);
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    );
  }
}
// Configuración para permitir solicitudes de Mercado Pago
export const config = {
  api: {
    bodyParser: false,
  },
};
