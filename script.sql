drop table users;
drop table router;
create table router (id serial not null,  mac varchar(50), ssid varchar(50), ubicacion varchar(50), primary key (id));
create table users (id serial not null, name varchar(20), email varchar(30), password varchar(50), fk_router integer, primary key (id), foreign key (fk_router) references router (id));

insert into router(mac, ssid, ubicacion) values('74:3E:2B:76:BE:7C', '74:3E:2B:76:BE:7C', 'piso 4');


insert into router(mac, ssid, ubicacion) values('B4:75:0E:4E:F7:D6', 'B4:75:0E:4E:F7:D6', 'goku');
insert into router(mac, ssid, ubicacion) values('84:18:3A:79:48:E8', '84:18:3A:79:48:E8', 'piso 3');
insert into router(mac, ssid, ubicacion) values('E8:F8:B3:A6:70:9F', 'E8:F8:B3:A6:70:9F', 'piso 3'); --hulk
insert into router(mac, ssid, ubicacion) values('B4:75:0E:4E:F7:D7', 'B4:75:0E:4E:F7:D7', 'goku');

insert into users (name, email, password) values('usuario apellido', 'usuario@virtualmind.io', '123');
insert into users (name, email, password, fk_router) values('usuario2 apellido2', 'usuario2@virtualmind.io', '123', 2);
insert into users (name, email, password, fk_router) values('usuario3 apellido3', 'usuario3@virtualmind.io', '123', 1);
insert into users (name, email, password) values('usuario4 apellido4', 'usuario4@virtualmind.io', '123');
insert into users (name, email, password) values('usuario5 apellido5', 'usuario5@virtualmind.io', '123');
select u.*, r.ubicacion from users as u left join router as r on(r.id = u.fk_router);


select * from users where password='123' and email='usuario@virtualmind.io';


select * from users where name like concat('%','usuario','2%');


update users set fk_router = (select id from router where ssid = 'router2') where email = 'usuario4@virtualmind.io';

select * from users
