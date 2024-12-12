# 1. Gunakan Node.js versi stabil sebagai base image
FROM node:18-slim

# 2. Set working directory di dalam container
WORKDIR /app

# 3. Copy package.json dan package-lock.json ke dalam container
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy seluruh file proyek ke dalam container
COPY . .

# 6. Set environment variable untuk PORT (gunakan 8080 untuk Cloud Run)
ENV PORT=8080

# 7. Expose port aplikasi
EXPOSE 8080

# 8. Perintah untuk menjalankan aplikasi
CMD ["node", "server.js"]
