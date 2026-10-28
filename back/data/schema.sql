create table users(
	id uuid primary key default gen_random_uuid(),
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

create table sessions(
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null references users(id) on delete cascade,
	session_id text not null unique,
	expires_at timestamptz not null default now() + interval '3 days',
	valid boolean not null default true,
	generated_at timestamptz not null default now()
);

create index sessions_user_id_idx on sessions (user_id);
