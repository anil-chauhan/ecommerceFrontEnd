# Use the latest Node.js LTS (Long Term Support) version as the base image
FROM node:lts as build

RUN dir

# Set the working directory in the container
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app/

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the Angular app for production
RUN npm run build --prod

# Stage 2: Serve Angular application with Nginx
FROM nginx:latest

# Copy built Angular app from the 'build' stage
COPY --from=build /app/dist/frontend-angular/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
