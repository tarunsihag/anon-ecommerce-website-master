pipeline {
    agent { label 'linux' }  // Use Linux-based agent
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-ecommerce-app .'  // Linux shell command
            }
        }
        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 80:80 my-ecommerce-app'  // Linux shell command
            }
        }
    }
}
