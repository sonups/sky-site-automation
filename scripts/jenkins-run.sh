cd ..
cd jenkins
docker build -t sps89/jenkins-sky .
docker kill jenkins-sky
docker rm jenkins-sky 
docker run -d --shm-size=2048m --name jenkins-sky -v /var/run/docker.sock:/var/run/docker.sock -p 8089:8080 -p 50000:50000 sps89/jenkins-sky
