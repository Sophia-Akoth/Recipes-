FROM node:19-alpine as build
WORKDIR /
COPY package*.json /
RUN npm install
COPY ./ /
RUN npm run build

# Pull the minimal Ubuntu image
FROM ubuntu

# Install Nginx
RUN apt-get -y update && apt-get -y install nginx

COPY  --from=build ./build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port for access
EXPOSE 8080:80

# Run the Nginx server
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
