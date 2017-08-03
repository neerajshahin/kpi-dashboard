#!/bin/bash

echo "Shell started"
echo "==========================="

#ENV=$1

APP_NAME=OA-Dashboard

ECS_REPOSITORY=012177264511.dkr.ecr.us-east-1.amazonaws.com/oadashboard

S3_BUCKET=appe-dev-docker-bucket

# later we can move the above configuration to bamboo variables,
# so we can keep one build script file for all the micro services 
#------------------------------------------------------------------------------

echo "Running npm install"
echo "==========================="
npm install
if [ $? -ne 0 ]; then
    echo "Faild while runing npm install"
	exit 3
fi

echo "Running npm run build"
echo "==========================="
npm run build
if [ $? -ne 0 ]; then
    echo "Faild while runing npm run build"
	exit 3
fi

echo "Running npm test"
echo "==========================="
npm test
if [ $? -ne 0 ]; then
    echo "Faild while runing npm test"
	exit 3
fi

echo "Running sonar for quality and coverage"
echo "==========================="
bash /opt/sonar-scanner-2.8/bin/sonar-scanner -Dsonar.host.url=${SONAR_SERVER_URL}
if [ $? -ne 0 ]; then
    echo "Faild while runing sonar"
	exit 3
fi

echo $TAG

TAG=$APP_NAME-${TAG}
		
echo $TAG

DOCKER_IMAGE_NAME=$ECS_REPOSITORY:$TAG

sudo docker build -t $DOCKER_IMAGE_NAME .

echo 'Logging into AWS Docker'
sudo $(aws ecr get-login --region us-east-1)

echo "Pushing new image $DOCKER_IMAGE_NAME to ECR"
sudo docker push ${DOCKER_IMAGE_NAME}
		
echo "-------------Creating and pushing Dockerrun.aws.json to s3-------------------------------"

DOCKERJSON=$(sed -e 's|{{TAG}}|'"$TAG"'|g' dockerrun.aws.tpl)
echo ${DOCKERJSON} > Dockerrun.aws.json

DOCKERJSON=$(sed -e 's|{{APP_NAME}}|'"$APP_NAME"'|g' Dockerrun.aws.json)
echo ${DOCKERJSON} > Dockerrun.aws.json

cat Dockerrun.aws.json
zip $TAG.zip Dockerrun.aws.json
zip $APP_NAME-latest.zip Dockerrun.aws.json

aws s3 cp $TAG.zip s3://$S3_BUCKET/$TAG.zip
aws s3 cp $APP_NAME-latest.zip s3://$S3_BUCKET/$APP_NAME-latest.zip
#create and push to 2 zip to s3
#1 versioned and 1 latest