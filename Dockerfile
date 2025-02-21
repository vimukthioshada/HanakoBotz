# Use official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g pm2 && npm install

# Copy project files
COPY . .

# Expose the port (if needed)
EXPOSE 3000

# Run the bot using PM2
CMD ["pm2-runtime", "start", "index.js", "--deep-monitoring", "--attach", "--name", "WOLF_MD"]
