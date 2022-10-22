create table users (
    id int primary key,
    first_name varchar not null,
    last_name varchar not null,
    email varchar not null,
    is_mentor boolean not null
   );
   
   create table skills (
    id int primary key,
    mentor_id int,
    description varchar(300) unique not null,
    foreign key (mentor_id) references users(id)
   );
     
    create table chatlog (
    id int,
    sender_id int,
    receiver_id int,
    message varchar,
    datetime timestamp,   
    foreign key (sender_id) references users(id),
    foreign key (receiver_id) references users(id)
  );