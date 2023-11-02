# Use the official Node.js image as the build stage
FROM node:14-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Use the official Nginx image as the final stage
FROM nginx:alpine

# Copy the built files from the build stage to the Nginx web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port (80)
EXPOSE 8080:80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

