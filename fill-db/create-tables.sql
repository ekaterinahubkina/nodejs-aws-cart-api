CREATE TABLE IF NOT EXISTS public.carts
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    status carts_status_enum NOT NULL,
    CONSTRAINT carts_pkey PRIMARY KEY (id),
    CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.products
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    price integer NOT NULL,
    CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.cart_items
(
    cart_id uuid NOT NULL,
    count integer NOT NULL,
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    product_id uuid NOT NULL,
    CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY (id),
    CONSTRAINT "FK_30e89257a105eab7648a35c7fce" FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY (cart_id)
        REFERENCES public.carts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.orders
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    cart_id uuid NOT NULL,
    payment json,
    delivery json NOT NULL,
    comments character varying COLLATE pg_catalog."default",
    total integer NOT NULL,
    status orders_status_enum NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT "UQ_f42b1d95404c45b10bf2451d814" UNIQUE (cart_id),
    CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY (cart_id)
        REFERENCES public.carts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
