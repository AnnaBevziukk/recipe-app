# Базовий образ з Node.js (легкий і швидкий)
FROM node:18


# Робоча директорія всередині контейнера
WORKDIR /usr/src/app

# Копіюємо package.json та lock файл
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код проєкту
COPY . .

# Збираємо TypeScript код (NestJS)
RUN npm run build

# Відкриваємо порт, який використовує додаток
EXPOSE 3000

# CMD ["node", "dist/main.js"]
CMD ["npm", "run", "start:dev"]
