# Example API

    This is an API Users demo project using Postgresql, Nodejs, Express, TypeScript and Sequalize.

### Databse 
        -- Table: public.users
        -- DROP TABLE IF EXISTS public.users;
        CREATE TABLE IF NOT EXISTS public.users
        (
            id uuid NOT NULL,
            name "char"[] NOT NULL,
            age numeric NOT NULL DEFAULT '0'::numeric,
            hobbies "char"[] NOT NULL,
            CONSTRAINT users_pkey PRIMARY KEY (id)
        )
        TABLESPACE pg_default;
        ALTER TABLE IF EXISTS public.users
            OWNER to postgres;