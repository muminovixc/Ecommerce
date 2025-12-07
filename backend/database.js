require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

console.log('🔍 DATABASE_URL postavljen:', !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL nije postavljen u .env fajlu!');
  throw new Error('DATABASE_URL is required');
}

try {
  // Kreirajte konekciju
  const sql = neon(process.env.DATABASE_URL);
  console.log('✅ Neon konekcija uspješno kreirana');
  
  // Testirajte konekciju koristeći tagged template
  sql`SELECT 1 as test`
    .then(result => {
      console.log('✅ Test konekcije uspješan:', result[0].test);
    })
    .catch(error => {
      console.error('❌ Test konekcije failed:', error.message);
    });
  
  // Eksportujte sql
  module.exports = sql;
} catch (error) {
  console.error('❌ Greška pri kreiranju Neon konekcije:', error.message);
  throw error;
}