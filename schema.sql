create table users (
    id int primary key,
    first_name varchar not null,
    last_name varchar not null,
    email varchar not null,
    is_mentor boolean not null
   );
   
   create table skills (
    id int primary key,
    description varchar(300) unique not null
   );
     
    create table chatlog (
    id int primary key,
    sender_id int not null,
    receiver_id int not null,
    message varchar not null,
    datetime timestamp,   
    foreign key (sender_id) references users(id),
    foreign key (receiver_id) references users(id)
  );

  create table skill_assignments (
    id int primary key,
    mentor_id int,
    skill_id int,
    foreign key (mentor_id) references users(id),
    foreign key (skill_id) references skills(id)
  )