## Setup MongoDB via docker
```
docker run -d --name mongoose -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=rootuser -e MONGO_INITDB_ROOT_PASSWORD=rootpass mongo

docker run -d --name mongo-express  -p 8081:8081  -e ME_CONFIG_OPTIONS_EDITORTHEME="ambiance" -e ME_CONFIG_MONGODB_SERVER="web_db_1"  -e ME_CONFIG_BASICAUTH_USERNAME="root"  -e ME_CONFIG_BASICAUTH_PASSWORD="root123"  mongo-express

docker-compose -f docker-compose.yaml up -d
mongo
use mongodb
docker logs mongoose --follow

show dbs

```