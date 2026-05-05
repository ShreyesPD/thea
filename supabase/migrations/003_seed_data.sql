-- Seed data for Thea fashion e-commerce platform
-- This migration populates the database with dummy data for testing

-- Insert sample products
INSERT INTO public.products (id, name, description, price, category, images, stock, sizes) VALUES
  -- Dresses
  ('11111111-1111-1111-1111-111111111111', 'Silk Midi Dress', 'Elegant silk midi dress with a flowing silhouette, perfect for evening occasions. Features delicate draping and a subtle sheen.', 189.99, 'dresses', ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800'], 15, ARRAY['XS', 'S', 'M', 'L']),
  ('11111111-1111-1111-1111-111111111112', 'Linen Maxi Dress', 'Breathable linen maxi dress in natural tones. Relaxed fit with adjustable straps and side pockets.', 149.99, 'dresses', ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800', 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800'], 20, ARRAY['S', 'M', 'L', 'XL']),
  ('11111111-1111-1111-1111-111111111113', 'Black Cocktail Dress', 'Timeless black cocktail dress with structured bodice and A-line skirt. Perfect for formal events.', 229.99, 'dresses', ARRAY['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800'], 8, ARRAY['XS', 'S', 'M', 'L', 'XL']),
  ('11111111-1111-1111-1111-111111111114', 'Floral Print Wrap Dress', 'Romantic floral print wrap dress with ruffled hem. Adjustable tie waist for a flattering fit.', 139.99, 'dresses', ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800'], 25, ARRAY['XS', 'S', 'M', 'L']),
  
  -- Tops
  ('22222222-2222-2222-2222-222222222221', 'Cashmere Sweater', 'Luxurious cashmere crewneck sweater in classic ivory. Soft, lightweight, and incredibly warm.', 299.99, 'tops', ARRAY['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'], 12, ARRAY['XS', 'S', 'M', 'L', 'XL']),
  ('22222222-2222-2222-2222-222222222222', 'Silk Blouse', 'Elegant silk blouse with pearl button details. Features a relaxed fit and subtle sheen.', 159.99, 'tops', ARRAY['https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800'], 18, ARRAY['XS', 'S', 'M', 'L']),
  ('22222222-2222-2222-2222-222222222223', 'Cotton Turtleneck', 'Essential cotton turtleneck in black. Fitted silhouette perfect for layering.', 79.99, 'tops', ARRAY['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800'], 30, ARRAY['XS', 'S', 'M', 'L', 'XL']),
  ('22222222-2222-2222-2222-222222222224', 'Linen Button-Up Shirt', 'Crisp linen button-up shirt in white. Oversized fit with dropped shoulders.', 119.99, 'tops', ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'], 22, ARRAY['S', 'M', 'L', 'XL']),
  
  -- Bottoms
  ('33333333-3333-3333-3333-333333333331', 'Wide Leg Trousers', 'High-waisted wide leg trousers in navy. Tailored fit with front pleats and side pockets.', 169.99, 'bottoms', ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'], 16, ARRAY['24', '26', '28', '30', '32']),
  ('33333333-3333-3333-3333-333333333332', 'Denim Jeans', 'Classic straight-leg denim jeans in vintage wash. Mid-rise with five-pocket styling.', 129.99, 'bottoms', ARRAY['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'], 28, ARRAY['24', '26', '28', '30', '32', '34']),
  ('33333333-3333-3333-3333-333333333333', 'Pleated Midi Skirt', 'Flowing pleated midi skirt in champagne. Elastic waistband for comfort.', 139.99, 'bottoms', ARRAY['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800'], 14, ARRAY['XS', 'S', 'M', 'L']),
  ('33333333-3333-3333-3333-333333333334', 'Leather Pants', 'Sleek faux leather pants with slim fit. Features front seam details and ankle zippers.', 199.99, 'bottoms', ARRAY['https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800'], 10, ARRAY['24', '26', '28', '30', '32']),
  
  -- Outerwear
  ('44444444-4444-4444-4444-444444444441', 'Wool Coat', 'Double-breasted wool coat in camel. Classic silhouette with notched lapels and side pockets.', 449.99, 'outerwear', ARRAY['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800'], 8, ARRAY['XS', 'S', 'M', 'L']),
  ('44444444-4444-4444-4444-444444444442', 'Leather Jacket', 'Moto-style leather jacket in black. Features asymmetric zip closure and belted waist.', 599.99, 'outerwear', ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'], 6, ARRAY['XS', 'S', 'M', 'L', 'XL']),
  ('44444444-4444-4444-4444-444444444443', 'Trench Coat', 'Classic trench coat in beige. Water-resistant fabric with belted waist and storm flap.', 379.99, 'outerwear', ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'], 12, ARRAY['S', 'M', 'L', 'XL']),
  ('44444444-4444-4444-4444-444444444444', 'Puffer Jacket', 'Oversized puffer jacket in matte black. Quilted design with high collar and zip pockets.', 289.99, 'outerwear', ARRAY['https://images.unsplash.com/photo-1548126032-079d1c7a8a3e?w=800'], 15, ARRAY['XS', 'S', 'M', 'L', 'XL']),
  
  -- Accessories
  ('55555555-5555-5555-5555-555555555551', 'Leather Tote Bag', 'Structured leather tote in cognac. Features interior pockets and magnetic closure.', 349.99, 'accessories', ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'], 20, ARRAY['One Size']),
  ('55555555-5555-5555-5555-555555555552', 'Silk Scarf', 'Hand-rolled silk scarf with abstract print. Versatile styling for neck or hair.', 89.99, 'accessories', ARRAY['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800'], 35, ARRAY['One Size']),
  ('55555555-5555-5555-5555-555555555553', 'Gold Hoop Earrings', 'Classic gold-plated hoop earrings. Lightweight and hypoallergenic.', 69.99, 'accessories', ARRAY['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'], 50, ARRAY['One Size']),
  ('55555555-5555-5555-5555-555555555554', 'Leather Belt', 'Italian leather belt with gold buckle. Available in black and brown.', 119.99, 'accessories', ARRAY['https://images.unsplash.com/photo-1624222247344-550fb60583f0?w=800'], 25, ARRAY['S', 'M', 'L']);

-- Insert sample enquiries
INSERT INTO public.enquiries (id, name, email, message, read) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'Sarah Johnson', 'sarah.j@example.com', 'Hi, I would like to know more about your sizing guide for dresses. Do you offer custom sizing?', false),
  ('e2222222-2222-2222-2222-222222222222', 'Michael Chen', 'mchen@example.com', 'When will the new spring collection be available? I am particularly interested in linen pieces.', true),
  ('e3333333-3333-3333-3333-333333333333', 'Emma Williams', 'emma.w@example.com', 'I received my order but the silk blouse is the wrong size. How can I exchange it?', true),
  ('e4444444-4444-4444-4444-444444444444', 'David Brown', 'dbrown@example.com', 'Do you ship internationally? I am located in London and interested in ordering the wool coat.', false),
  ('e5555555-5555-5555-5555-555555555555', 'Olivia Martinez', 'olivia.m@example.com', 'I love your brand aesthetic! Are you planning to open a physical store location?', false);

-- Insert sample lookbook collections
INSERT INTO public.lookbook_collections (id, title, description, images, season, year) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Autumn Reverie', 'A celebration of rich textures and warm tones. This collection explores the intersection of comfort and sophistication through luxurious fabrics and timeless silhouettes.', ARRAY['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200'], 'Fall', 2024),
  ('a2222222-2222-2222-2222-222222222222', 'Minimalist Essentials', 'Clean lines and neutral palettes define this capsule collection. Each piece is designed to be versatile, timeless, and effortlessly elegant.', ARRAY['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200', 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200'], 'Spring', 2024),
  ('a3333333-3333-3333-3333-333333333333', 'Urban Nomad', 'Inspired by city life and global travels. This collection merges functionality with high fashion, perfect for the modern woman on the move.', ARRAY['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200', 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c0d?w=1200'], 'Summer', 2024);

-- Note: Users and orders require authentication and will need to be created through the application
-- The following are example SQL statements that would work if you have actual auth.users entries:

-- Example user insert (commented out as it requires actual Supabase auth users):
-- INSERT INTO public.users (id, email, name, role) VALUES
--   ('a1111111-1111-1111-1111-111111111111', 'admin@thea.com', 'Admin User', 'admin'),
--   ('c1111111-1111-1111-1111-111111111111', 'customer@example.com', 'Jane Doe', 'customer');

-- Example order insert (commented out as it requires actual user IDs):
-- INSERT INTO public.orders (id, user_id, total_amount, status) VALUES
--   ('o1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 319.98, 'delivered'),
--   ('o2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 189.99, 'shipped');

-- Example order items insert (commented out as it requires actual order and product IDs):
-- INSERT INTO public.order_items (order_id, product_id, quantity, size, price) VALUES
--   ('o1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 1, 'M', 189.99),
--   ('o1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333332', 1, '28', 129.99),
--   ('o2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 1, 'S', 189.99);
