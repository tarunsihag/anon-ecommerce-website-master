FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
docker rm -f ecommerce lucid_leakey
docker rmi my-ecommerce-app
