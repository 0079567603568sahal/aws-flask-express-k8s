# Use Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "index.js"]
