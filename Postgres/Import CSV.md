### Create the table during the import:
~~~
COPY table_name FROM '/path_to_csv_file.csv' DELIMITERS ',' CSV;
~~~

### Insert the data into an existing table
~~~

CREATE TABLE public.address
(
    address_id integer NOT NULL,
    address character varying(50) COLLATE pg_catalog."default" NOT NULL,
    address2 character varying(50) COLLATE pg_catalog."default",
    district character varying(20) COLLATE pg_catalog."default" NOT NULL,
    city_id smallint NOT NULL,
    postal_code character varying(10) COLLATE pg_catalog."default",
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    last_update timestamp without time zone NOT NULL DEFAULT now()
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.address
    OWNER to postgres;

~~~

~~~
COPY address(address_id, address, address2, district, city_id, postal_code, phone, last_update)
FROM 'C:\address.csv' DELIMITER ',' CSV HEADER;

~~~
