// Test database connections
const { Client } = require('pg');

// Direct connection
const directClient = new Client({
  connectionString: "postgresql://postgres:SrYQn1g7xCBPTWyx@db.jgrhymjnaharrxogfwve.supabase.co:5432/postgres"
});

// Pooler connection
const poolerClient = new Client({
  connectionString: "postgresql://postgres.jgrhymjnaharrxogfwve:SrYQn1g7xCBPTWyx@aws-1-eu-central-2.pooler.supabase.com:5432/postgres"
});

async function testConnection(client, name) {
  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    console.log(`✅ ${name} connection successful:`, result.rows[0]);
    await client.end();
  } catch (error) {
    console.error(`❌ ${name} connection failed:`, error.message);
  }
}

console.log('Testing database connections...\n');

testConnection(directClient, 'DIRECT').then(() => {
  testConnection(poolerClient, 'POOLER');
});
