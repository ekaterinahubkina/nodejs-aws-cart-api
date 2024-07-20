INSERT INTO public.carts(
	id, user_id, created_at, updated_at, status)
	VALUES
	('585e5c07-41d1-49ac-bcb9-c05e72753f30', '08c69f2f-72a1-4fc0-a02d-075b2f6b1693', default, default, 'OPEN'),
	('fc59b626-e9e5-4af4-8c67-bc9d179e0b5a', '8a3765d5-857b-43be-8526-18c23f2927a7', default, default, 'OPEN');

INSERT INTO public.products(
	id, title, description, price)
	VALUES 
	('9b16a825-a0a5-4d2b-b236-f0233d19b3be', 'product1', 'description of product1', 123),
	('d41e920f-a53a-4307-ae14-6ea4c0bf2e5e', 'product2', 'description of product2', 321)	

INSERT INTO public.cart_items(
	cart_id, count, id, product_id)
	VALUES 
	('585e5c07-41d1-49ac-bcb9-c05e72753f30', 1, default, '9b16a825-a0a5-4d2b-b236-f0233d19b3be'),
	('fc59b626-e9e5-4af4-8c67-bc9d179e0b5a', 2, default, 'd41e920f-a53a-4307-ae14-6ea4c0bf2e5e');
	
INSERT INTO public.users(
	id, name, email, password, created_at, id)
	VALUES
	(default, 'John Doe', 'john-doe@gmail.com', '12345', default),
	(default, 'Jane Doe', 'jane-doe@gmail.com', '12345', default);
	
INSERT INTO public.orders(
	id, user_id, cart_id, payment, delivery, comments, total, status)
	VALUES 
    (default, '08c69f2f-72a1-4fc0-a02d-075b2f6b1693', '585e5c07-41d1-49ac-bcb9-c05e72753f30', '{"method": "cash", "amount": 123}', '{"type": "some type", "address": "12 some street"}', '', 123, 'ORDERED'),
    (default, '8a3765d5-857b-43be-8526-18c23f2927a7', 'fc59b626-e9e5-4af4-8c67-bc9d179e0b5a', '{"method": "card", "amount": 321}', '{"type": "some type", "address": "11 some street"}', '', 321, 'ORDERED');