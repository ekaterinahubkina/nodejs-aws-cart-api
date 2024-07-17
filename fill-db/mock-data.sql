INSERT INTO public.carts(
	id, user_id, created_at, updated_at, status)
	VALUES 
	('585e5c07-41d1-49ac-bcb9-c05e72753f30', 'fbfabdeb-3131-4558-8b59-c6b59bd5ef56', default, default, 'ORDERED'),
	('fc59b626-e9e5-4af4-8c67-bc9d179e0b5a', 'c290d7db-feba-4f85-a065-393162f8de05', default, default, 'OPEN');

INSERT INTO public.cart_items(
	cart_id, product_id, count)
	VALUES 
	('585e5c07-41d1-49ac-bcb9-c05e72753f30', '9b16a825-a0a5-4d2b-b236-f0233d19b3be', 1),
	('fc59b626-e9e5-4af4-8c67-bc9d179e0b5a', 'd41e920f-a53a-4307-ae14-6ea4c0bf2e5e', 2);
	

INSERT INTO public.users(
	id, name, email, created_at)
	VALUES 
	('e24bc38c-0689-4d1d-81f4-873f1f235b18', 'John Doe', 'john-doe@gmail.com', default),
	('15c8d42f-1504-4e8d-ab95-f79d781edba4', 'Jane Doe', 'jane-doe@gmail.com', default);
	
INSERT INTO public.orders(
	id, user_id, cart_id, payment, delivery, comments, status, total)
	VALUES
    ('6f204c3c-415d-4c9c-a2db-2c7402e5d5d3', '15c8d42f-1504-4e8d-ab95-f79d781edba4', '585e5c07-41d1-49ac-bcb9-c05e72753f30', '{"method": "cash", "amount": 123}', '{"type": "some type", "address": "12 some street"}', '', 'ORDERED', 123),
    ('1ffa3aaa-baeb-44e7-ae73-437dfdec71fa', 'e24bc38c-0689-4d1d-81f4-873f1f235b18', 'fc59b626-e9e5-4af4-8c67-bc9d179e0b5a', '{"method": "card", "amount": 321}', '{"type": "some type", "address": "11 some street"}', '', 'ORDERED', 321);
