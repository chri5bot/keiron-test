CREATE DATABASE IF NOT EXISTS keiron DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE keiron;

Create table if not exists user_types(
	id int(11) not null, 
	role varchar(50) not null
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

ALTER TABLE user_types ADD PRIMARY KEY (id);
ALTER TABLE user_types MODIFY id int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

Create table if not exists users(
	id int(11) not null,  
	user_type_id int(11) not null,  
	username varchar(50) NOT NULL,
	password varchar(255) NOT NULL,
   	email varchar(100) NOT NULL,
	INDEX user_type_index (user_type_id),
	FOREIGN KEY (user_type_id)
        REFERENCES user_types(id)
        ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users MODIFY id int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

Create table if not exists tickets(
	id int(11) not null,  
	user_id int(11) not null,  
	selected BOOLEAN,
	INDEX user_index (user_id),
	FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

ALTER TABLE tickets ADD PRIMARY KEY (id);
ALTER TABLE tickets MODIFY id int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

-- REMENBER USE THE KEIRON DB

USE keiron;

INSERT INTO user_types (id, role) VALUES (2, 'admin');
INSERT INTO user_types (id, role) VALUES (3, 'user');

-- ADMIN USER
insert into users (id, user_type_id, username, password, email) values (2, 2, "christian", "asd", "chris@gmail.com");

-- USERS    
insert into users (id, user_type_id, username, password, email) values (3, 3, "juan", "asd", "juan@gmail.com");
insert into users (id, user_type_id, username, password, email) values (4, 3, "pedro", "asd", "pedro@gmail.com");

-- INSERT TICKETS
insert into tickets (user_id, selected) values (3, true);
insert into tickets (user_id, selected) values (3, true);
insert into tickets (user_id, selected) values (3, false);
insert into tickets (user_id, selected) values (4, true);
insert into tickets (user_id, selected) values (4, true);
insert into tickets (user_id, selected) values (4, true);
insert into tickets (user_id, selected) values (4, false);