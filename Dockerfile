# Production build using Node
FROM node:20-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port app (misal Vite preview 4173 / Express 3001)
EXPOSE 3001

# Jalankan seperti development (TANPA nginx)
CMD ["npm", "run", "dev"]
