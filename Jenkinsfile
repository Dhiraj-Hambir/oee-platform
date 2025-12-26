pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "oee-frontend"
        BACKEND_IMAGE = "oee-backend"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/Dhiraj-Hambir/oee-platform.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                cd backend
                docker build -t $BACKEND_IMAGE:latest .
                minikube image load $BACKEND_IMAGE:latest
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                cd frontend
                docker build -t $FRONTEND_IMAGE:latest .
                minikube image load $FRONTEND_IMAGE:latest
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/
                kubectl rollout restart deployment backend
                kubectl rollout restart deployment frontend
                '''
            }
        }
    }
}

