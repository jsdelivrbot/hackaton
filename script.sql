drop table users;
drop table router;
create table router (id serial not null,  mac varchar(50), ssid varchar(50), ubicacion varchar(50), primary key (id));
create table users (id serial not null, name varchar(20), email varchar(30), password varchar(50), fk_router integer, primary key (id), foreign key (fk_router) references router (id));

insert into router(mac, ssid, ubicacion) values('a5:b5:t:8', 'router1', 'piso 1');
insert into router(mac, ssid, ubicacion) values('x5:r5:z:8', 'router2', 'piso 2');

insert into users (name, email, password) values('usuario apellido', 'usuario@virtualmind.io', '123');
insert into users (name, email, password) values('usuario2 apellido2', 'usuario2@virtualmind.io', '123');
insert into users (name, email, password) values('usuario3 apellido3', 'usuario3@virtualmind.io', '123');
insert into users (name, email, password) values('usuario4 apellido4', 'usuario4@virtualmind.io', '123');
select * from users;
