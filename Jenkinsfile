pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerHome = "C:/Program Files/Docker/Docker/resources/bin"  // Change to your Docker path
                    bat "${dockerHome}/docker build -t my-ecommerce-app ."
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    bat "${dockerHome}/docker run -d -p 80:80 my-ecommerce-app"
                }
            }
        }
    }
}
