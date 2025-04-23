import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Inicializa el cliente de Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: { 
    integratorId: 'dev_24c65fb163bf11ea96500242ac130004' // ID del integrador
  }
});
export async function POST(request) {
  try {
    const body = await request.json();
    const { items } = body;
    
    // Crea el objeto de preferencia
    const preference = new Preference(client);
    
    // URL base para las redirects (ajusta según tu entorno)
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const preferenceData = {
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        picture_url: `${baseUrl}${item.image}`,
        quantity: item.quantity,
        unit_price: item.price / 100, // Convertir de centavos
        currency_id: 'ARS' // Ajusta según tu moneda local
      })),
      
      // URLs de retorno
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`
      },
      
      // URL de notificaciones
      notification_url: `${baseUrl}/api/mercadopago/webhook`,
      
      // External reference (correo del usuario)
      external_reference: "tu_correo@ejemplo.com", // Reemplaza con tu correo
      
      // Configuración de pagos
      payment_methods: {
        excluded_payment_methods: [{ id: 'visa' }], // Excluir Visa
        installments: 6 // Máximo 6 cuotas
      },
      
      auto_return: 'approved',
    };
    
    const result = await preference.create({ body: preferenceData });
    
    return NextResponse.json({ 
      preferenceId: result.id,
      init_point: result.init_point
    });
    
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return NextResponse.json(
      { error: 'Error al crear preferencia' },
      { status: 500 }
    );
  }
}
