pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/tarunsihag/anon-ecommerce-website-master.git'  
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('my-ecommerce-app')
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker rm -f ecommerce || true'
                sh 'docker run -d -p 3000:3000 --name ecommerce my-ecommerce-app'
            }
        }
    }
}
