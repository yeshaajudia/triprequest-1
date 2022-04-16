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

insert into batch1btr_user (username, userpassword,uname, user_role) values ('supervisor@mastek.com', '$2b$10$PIF1XlLhT9cwEyTGmG5kYe2QyDOCIYscdl7Q5W2wDYu0qXCAivAty','supervisor','L1');
insert into batch1btr_user (username, userpassword,uname, user_role) values ('depthead@mastek.com', '$2b$10$PIF1XlLhT9cwEyTGmG5kYe2QyDOCIYscdl7Q5W2wDYu0qXCAivAty','depthead','L2');
insert into batch1btr_user (username, userpassword,uname, user_role) values ('prochead@mastek.com', '$2b$10$PIF1XlLhT9cwEyTGmG5kYe2QyDOCIYscdl7Q5W2wDYu0qXCAivAty','prochead','L3');
insert into batch1btr_user (username, userpassword,uname, user_role) values ('admin@mastek.com', '$2b$10$PIF1XlLhT9cwEyTGmG5kYe2QyDOCIYscdl7Q5W2wDYu0qXCAivAty','admin','ADMIN');

commit;