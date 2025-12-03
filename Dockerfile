# Production build using Node
FROM node:20-alpine

WORKDIR /app

# Accept build arguments with defaults
ARG VITE_API_BASE_URL=https://api-quran.kancralabs.com
ARG VITE_PRIMARY_COLOR=#2E7D32
ARG VITE_PRIMARY_LIGHT=#4CAF50
ARG VITE_PRIMARY_DARK=#1B5E20
ARG VITE_SECONDARY_COLOR=#388E3C
ARG VITE_BACKGROUND_COLOR=#FFFFFF
ARG VITE_PAPER_COLOR=#F5F5F5

# Set as environment variables (Vite needs these at build time)
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_PRIMARY_COLOR=$VITE_PRIMARY_COLOR
ENV VITE_PRIMARY_LIGHT=$VITE_PRIMARY_LIGHT
ENV VITE_PRIMARY_DARK=$VITE_PRIMARY_DARK
ENV VITE_SECONDARY_COLOR=$VITE_SECONDARY_COLOR
ENV VITE_BACKGROUND_COLOR=$VITE_BACKGROUND_COLOR
ENV VITE_PAPER_COLOR=$VITE_PAPER_COLOR

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application for production
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose port app
EXPOSE 3001

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "3001"]
