/**
 * Локальна перевірка з'єднання з MongoDB.
 * Запуск: npm run test:db
 */
require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI не вказаний у .env");
  process.exit(1);
}

console.log("Підключення до MongoDB...");
console.log("URI:", MONGODB_URI.replace(/:[^:@]+@/, ":****@"));

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(async () => {
    console.log("✅ Підключено!");
    const result = await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("✅ Ping:", result);
    await mongoose.disconnect();
    console.log("Відключено.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Помилка:", err.message);
    console.error("\nПеревір:");
    console.error("  1. Network Access у Atlas — додай 0.0.0.0/0 або свій IP");
    console.error("  2. Коректність логіну/пароля");
    console.error("  3. Інтернет-з'єднання");
    process.exit(1);
  });
