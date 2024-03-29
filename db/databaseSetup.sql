CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email text UNIQUE,
    password text
);

CREATE TABLE shows (
    show_id SERIAL PRIMARY KEY,
    title text,
    air_day text,
    site text,
    start_ep int,
    ending_ep int
);

CREATE TABLE userShows (
    next_ep int,
    user_id int,
    show_id int,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, show_id)
);

CREATE TABLE watchQueue (
    queue_ep int,
    user_id int,
    show_id int,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE,
    PRIMARY KEY (queue_ep, user_id, show_id)    
);