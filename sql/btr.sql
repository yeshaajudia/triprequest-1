create table batch1btr_user (
    user_id number(3) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key,
    username varchar(255)unique not null,
    userpassword varchar(255) not null,
    uname varchar(255) not null,
    date_of_joining varchar(255),
    nationality varchar(255),
    date_of_birth varchar(255),
    passport_number varchar(255),
    user_role varchar(255)
);
insert into batch1btr_user (username, userpassword,uname, user_role) values ('supervisor@mastek.com', 'root','supervisor','L1');
insert into batch1btr_user (username, userpassword,uname, user_role) values ('depthead@mastek.com', 'root','depthead','L2');
insert into batch1btr_user (username, userpassword,uname, user_role) values ('prochead@mastek.com', 'root','prochead','L3');


create table BATCH1BTR_TRIPDETAILS(
    trip_id number(3) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key,
    user_id number(3) references batch1btr_user(user_id),
    from_city varchar(255),
    from_country varchar(255),
    to_city varchar(255),
    to_country varchar(255),
    accomodation varchar(3),
    reason varchar(255),
    date_of_journey varchar(255),
    amount number(5),
    currency varchar(255),
    status varchar(255),
    pending_with varchar(255) Default 'supervisor'
);

select t.trip_id, t.from_city, t.to_city, t.from_country, t.to_country, t.accomodation, t.reason, t.date_of_journey, t.amount, t.currency, t.status, u.uname, u.date_of_joining, u.nationality, u.date_of_birth, u.passport_number from batch1btr_tripdetails t natural join batch1btr_user u where t.pending_with='supervisor'

create table batch1btr_locations (
    city_id number(3) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) primary key,
    city varchar(255),
    country varchar(255)
);

insert into batch1btr_locations (CITY,COUNTRY) values ('DELHI', 'INDIA');

insert into batch1btr_locations (CITY,COUNTRY) values ('AHMEDABAD', 'INDIA');

insert into batch1btr_locations (CITY,COUNTRY) values ('PUNE', 'INDIA');

insert into batch1btr_locations (CITY,COUNTRY) values ('DUBAI', 'UAE');

insert into batch1btr_locations (CITY,COUNTRY) values ('BERLIN', 'GERMANY');

insert into batch1btr_locations (CITY,COUNTRY) values ('LONDON', 'ENGLAND');

insert into batch1btr_locations (CITY,COUNTRY) values ('JAMSHEDPUR', 'INDIA');


insert into batch1btr_locations (CITY,COUNTRY) values ('ABU DHABI', 'UAE');

insert into batch1btr_locations (CITY,COUNTRY) values ('KUWAIT', 'UAE');
insert into batch1btr_locations (CITY,COUNTRY) values ('SHARJAH', 'UAE');

insert into batch1btr_locations (CITY,COUNTRY) values ('MANCHESTER', 'ENGLAND');
insert into batch1btr_locations (CITY,COUNTRY) values ('LIVERPOOL', 'ENGLAND');
insert into batch1btr_locations (CITY,COUNTRY) values ('BIRMINGHAM', 'ENGLAND');

insert into batch1btr_locations (CITY,COUNTRY) values ('HAMBURG', 'GERMANY');


commit;