sudo docker compose down --rmi all
sudo docker build --no-cache -t my-image2:latest
sudo docker compose up -d