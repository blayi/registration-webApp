drop table if exists towns, regNo;

create table towns(
	id  serial not null primary key,
	town text not null,
    reg_tag text not null
    
);

create table regNo (
	id serial not null primary key,
    town_id int not null,
    regNo text not null unique,
	foreign key (town_id) references towns(id)
);

insert into towns (town,reg_tag) values ('Malmesbury' , 'CK');
insert into towns (town,reg_tag) values ('Bellville' , 'CY');
insert into towns (town,reg_tag) values ('Cape Town' , 'CA');
insert into towns (town,reg_tag) values ('George' , 'CAW');
insert into towns (town,reg_tag) values ('All' , 'All');