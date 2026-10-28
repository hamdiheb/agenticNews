-- Database schema

create table users(
	id uuid primary key not null default gen_random_uuid(),
	email text not null unique,
	username text not null unique,
	password_hash text not null,
	display_name text not null,
	avatar_url text,
	email_verified boolean not null default false,
	last_login_at timestamptz,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);
