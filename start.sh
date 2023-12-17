sudo git pull

sudo docker build -t gpt-daily-collector .

sudo docker stop gpt-daily-collector
sudo docker rm gpt-daily-collector
sudo docker run -d --restart=always --name gpt-daily-collector -p 5500:5500 -it gpt-daily-collector 