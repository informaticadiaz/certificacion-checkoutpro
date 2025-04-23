import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializa el cliente de Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

export async function POST(request) {
  try {
    // Cambio aquí: usar json() en lugar de formData()
    const body = await request.json();
    
    // Logs para depuración
    console.log('Webhook received:', body);
    
    // Obtener action e ID del webhook
    const action = body.action;
    const paymentId = body.data.id;
    
    console.log(`Action: ${action}, Payment ID: ${paymentId}`);
    
    if (action === 'payment.created' || action === 'payment.updated') {
      // Obtener detalles del pago
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: paymentId });
      
      console.log('Payment ID:', paymentId);
      console.log('Payment status:', paymentData.status);
      
      // Aquí puedes guardar el pago en tu base de datos
      // y actualizar el estado del pedido
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en webhook:', error);
    return NextResponse.json(
      { error: 'Error procesando webhook', message: error.message },
      { status: 500 }
    );
  }
}