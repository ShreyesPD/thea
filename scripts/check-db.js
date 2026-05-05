const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local file
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

async function checkDatabase() {
  console.log('🔍 Checking database connection...');
  console.log('URL:', supabaseUrl);
  console.log('');

  // Check products table
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name')
    .limit(5);

  console.log('📦 Products table:');
  if (productsError) {
    console.log('  ❌ Error:', productsError.message);
  } else {
    console.log(`  ✅ Exists - ${products.length} products found`);
    if (products.length > 0) {
      products.forEach(p => console.log(`     - ${p.name}`));
    }
  }
  console.log('');

  // Check users table
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, name, role')
    .limit(5);

  console.log('👥 Users table:');
  if (usersError) {
    console.log('  ❌ Error:', usersError.message);
  } else {
    console.log(`  ✅ Exists - ${users.length} users found`);
    if (users.length > 0) {
      users.forEach(u => console.log(`     - ${u.name} (${u.role})`));
    }
  }
  console.log('');

  // Check orders table
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('id, status')
    .limit(5);

  console.log('📋 Orders table:');
  if (ordersError) {
    console.log('  ❌ Error:', ordersError.message);
  } else {
    console.log(`  ✅ Exists - ${orders.length} orders found`);
  }
  console.log('');

  // Check enquiries table
  const { data: enquiries, error: enquiriesError } = await supabase
    .from('enquiries')
    .select('id, name')
    .limit(5);

  console.log('💬 Enquiries table:');
  if (enquiriesError) {
    console.log('  ❌ Error:', enquiriesError.message);
  } else {
    console.log(`  ✅ Exists - ${enquiries.length} enquiries found`);
  }
  console.log('');

  // Check lookbook_collections table
  const { data: lookbooks, error: lookbooksError } = await supabase
    .from('lookbook_collections')
    .select('id, title')
    .limit(5);

  console.log('📸 Lookbook Collections table:');
  if (lookbooksError) {
    console.log('  ❌ Error:', lookbooksError.message);
  } else {
    console.log(`  ✅ Exists - ${lookbooks.length} collections found`);
    if (lookbooks.length > 0) {
      lookbooks.forEach(l => console.log(`     - ${l.title}`));
    }
  }
}

checkDatabase().catch(console.error);
