How to use:

1. Install depedencies
- npm install 
- composer install
2. Konfigurasi DB
- pada .env sesuaikan dengan server pada bagian:
	-> APP_NAME
	-> APP_ENV
	-> APP_KEY
	-> APP_DEBUG
	-> APP_URL
	-> DB_connection
	-> DB_Host
	-> DB_Port
	-> DB_Database
	-> DB_Username
	-> DB_Password

- php artisan key:generate

3. Kredensial Google Client
- ClientId("356925278435-8131j8sa1rob96r9nupg4upd7oolomsj.apps.googleusercontent.com");
- ClientSecret("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");
- RedirectUri("http://localhost:8000/auth/youtube/callback");

Mengatur Redirect URI
GCP -> Project Tugas Akhir -> Kredensial -> OAuth2.0 ClientId -> webClient1
