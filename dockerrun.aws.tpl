{
 "AWSEBDockerrunVersion": 2,

 	"volumes": [{
		"name": "application",
		"host": {
			"sourcePath": "/var/log/tnf"
		}
	}],

 "containerDefinitions": [
   {
     "name": "{{APP_NAME}}",
     "image": "{{ECS_REPOSITORY}}:{{TAG}}",
     "essential": true,
     "memory": 2048,
     "portMappings": [
       {
         "hostPort": 8200,
         "containerPort": 3000
       }
     ],
		
		"mountPoints": [{
			"sourceVolume": "application",
			"containerPath": "/logs"
		}]

   }
 ]
}