const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  // Read and execute the seed SQL file
  const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '003_seed_data.sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');

  // Execute the SQL
  const { data, error } = await supabase.rpc('exec_sql', { sql: sqlContent });

  if (error) {
    console.error('❌ Error executing seed SQL:', error.message);
    console.log('\n⚠️  The SQL needs to be run directly in Supabase SQL Editor.');
    console.log('Please copy the contents of supabase/migrations/003_seed_data.sql');
    console.log('and run it in: https://supabase.com/dashboard/project/otanlyuasavknmdnvzxz/sql/new');
    return;
  }

  console.log('✅ Seed data inserted successfully!\n');

  // Verify the data
  const { data: products } = await supabase.from('products').select('id, name').limit(5);
  const { data: enquiries } = await supabase.from('enquiries').select('id, name').limit(5);
  const { data: lookbooks } = await supabase.from('lookbook_collections').select('id, title').limit(5);

  console.log('📦 Products seeded:', products?.length || 0);
  console.log('💬 Enquiries seeded:', enquiries?.length || 0);
  console.log('📸 Lookbook collections seeded:', lookbooks?.length || 0);
}

seedDatabase().catch(console.error);
