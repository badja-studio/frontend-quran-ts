# Production build using Node
FROM node:20-alpine

WORKDIR /app

# Accept build arguments
ARG VITE_API_BASE_URL
ARG VITE_PRIMARY_COLOR
ARG VITE_PRIMARY_LIGHT
ARG VITE_PRIMARY_DARK
ARG VITE_SECONDARY_COLOR
ARG VITE_BACKGROUND_COLOR
ARG VITE_PAPER_COLOR

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

# Expose port app
EXPOSE 3001

# Run development server (with env vars already set)
CMD ["npm", "run", "dev", "--", "--port", "3001", "--host", "0.0.0.0"]
