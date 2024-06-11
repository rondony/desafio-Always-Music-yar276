create table users (
	id serial primary key,
	nombre varchar(50) not null,
	rut varchar(15) not null unique,
	curso varchar (20) not null,
	nivel int
);

SELECT * FROM users;

insert into users(nombre, rut, curso, nivel) 
values ('Enrrique Iglesias', '25.555.444-3', 'piano', '2');



