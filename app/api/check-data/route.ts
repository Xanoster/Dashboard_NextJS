import postgres from 'postgres';

const db = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    // Check all tables
    const invoices = await db`SELECT COUNT(*) FROM invoices`;
    const customers = await db`SELECT COUNT(*) FROM customers`;
    const users = await db`SELECT COUNT(*) FROM users`;
    const revenue = await db`SELECT COUNT(*) FROM revenue`;
    
    // Get sample data
    const sampleInvoices = await db`SELECT * FROM invoices LIMIT 5`;
    const sampleCustomers = await db`SELECT * FROM customers LIMIT 5`;

    return Response.json({
      counts: {
        invoices: invoices[0].count,
        customers: customers[0].count,
        users: users[0].count,
        revenue: revenue[0].count,
      },
      samples: {
        invoices: sampleInvoices,
        customers: sampleCustomers,
      }
    });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
