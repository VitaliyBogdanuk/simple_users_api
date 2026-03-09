# Simple API (Node.js + Express + Mongoose)

Простий REST API для CRUD операцій з користувачами.

## Технології

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv

## Запуск проєкту

1. Встановити залежності:

```bash
npm install
```

2. Створити `.env`:

```bash
cp .env.example .env
```

3. Переконатися, що MongoDB запущена.

4. Запустити сервер:

```bash
npm run dev
```

або

```bash
npm start
```

## Змінні середовища

Приклад у файлі `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/simple-api
```

## Базовий endpoint

```http
GET /
```

Відповідь:

```json
{
  "message": "Simple API is running"
}
```

## Перевірка підключення до БД

```http
GET /api/health/db
```

Відповідь (успіх, 200):

```json
{
  "ok": true,
  "message": "Database connection OK"
}
```

Відповідь (помилка, 503):

```json
{
  "ok": false,
  "message": "Database error",
  "error": "опис помилки"
}
```

## API: Користувачі

Базовий шлях: `/api/users`

### 1) Створити користувача

```http
POST /api/users
Content-Type: application/json
```

Body:

```json
{
  "name": "Ivan",
  "email": "ivan@example.com",
  "age": 25
}
```

curl:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ivan","email":"ivan@example.com","age":25}'
```

### 2) Отримати всіх користувачів

```http
GET /api/users
```

curl:

```bash
curl http://localhost:3000/api/users
```

### 3) Отримати користувача за ID

```http
GET /api/users/:id
```

curl:

```bash
curl http://localhost:3000/api/users/<ID>
```

### 4) Оновити користувача

```http
PUT /api/users/:id
Content-Type: application/json
```

Body (приклад):

```json
{
  "name": "Ivan Updated",
  "age": 26
}
```

curl:

```bash
curl -X PUT http://localhost:3000/api/users/<ID> \
  -H "Content-Type: application/json" \
  -d '{"name":"Ivan Updated","age":26}'
```

### 5) Видалити користувача

```http
DELETE /api/users/:id
```

curl:

```bash
curl -X DELETE http://localhost:3000/api/users/<ID>
```

## Тестування в Postman

1. Запусти сервер:

```bash
npm run dev
```

2. Відкрий Postman і створи нову Collection, наприклад `Simple API`.

3. Додай змінну колекції:

- `baseUrl` = `http://localhost:3000`

4. Створи запит `Health Check`:

- Method: `GET`
- URL: `{{baseUrl}}/`
- Очікувана відповідь: `{"message":"Simple API is running"}`

5. Створи запит `Create User`:

- Method: `POST`
- URL: `{{baseUrl}}/api/users`
- Body -> raw -> JSON:

```json
{
  "name": "Ivan",
  "email": "ivan@example.com",
  "age": 25
}
```

- Після успішного запиту скопіюй `_id` з відповіді.

6. Створи змінну колекції `userId` і встав значення `_id`.

7. Створи запит `Get All Users`:

- Method: `GET`
- URL: `{{baseUrl}}/api/users`

8. Створи запит `Get User By Id`:

- Method: `GET`
- URL: `{{baseUrl}}/api/users/{{userId}}`

9. Створи запит `Update User`:

- Method: `PUT`
- URL: `{{baseUrl}}/api/users/{{userId}}`
- Body -> raw -> JSON:

```json
{
  "name": "Ivan Updated",
  "age": 26
}
```

10. Створи запит `Delete User`:

- Method: `DELETE`
- URL: `{{baseUrl}}/api/users/{{userId}}`

Рекомендований порядок запуску в Postman:
`Health Check -> Create User -> Get All Users -> Get User By Id -> Update User -> Delete User`.

## Деплой на Vercel + MongoDB Atlas

Для коректної роботи з Vercel потрібно:

1. **MongoDB Atlas → Network Access**: додай `0.0.0.0/0` (Allow Access from Anywhere), бо Vercel використовує динамічні IP.
2. **Змінні середовища**: у Vercel Dashboard → Settings → Environment Variables додай `MONGODB_URI`.
3. У connection string додай ім’я бази перед `?`:  
   `mongodb+srv://...mongodb.net/simple-api?retryWrites=true&w=majority`

## Можливі помилки

- `MONGODB_URI is not set in .env` — не вказаний `MONGODB_URI`.
- `MongoDB connection error` — MongoDB не запущена, URI некоректний або Atlas блокує підключення (перевір Network Access).
- `Route ... not found` — неправильний endpoint.
