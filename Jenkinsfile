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
                    sh 'docker build -t my-ecommerce-app .'
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                script {
                    sh 'docker stop ecommerce || true'
                    sh 'docker rm ecommerce || true'
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    sh 'docker run -d -p 8888:80 --name ecommerce my-ecommerce-app'
                }
            }
        }
    }
}
