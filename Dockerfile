# Stage 1: Build the Vue.js application
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine as serve

# Copy built files to Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Run Mocha tests
FROM node:18 as test

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only the dev dependencies needed for testing
RUN npm install --only=dev

# Copy the entire project for testing
COPY . .

# Run Mocha tests
CMD ["npm", "test"]
