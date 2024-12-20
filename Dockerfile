# Use the Node.js 18 LTS base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Use a lightweight image for running the app
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
