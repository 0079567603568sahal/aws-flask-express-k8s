🧠 AWS Flask-Express K8s
Full-Stack Deployment: Flask Backend + Express Frontend

Technologies: Python (Flask), Node.js (Express), Docker, AWS ECR / ECS, Kubernetes (Minikube)

📘 Project Overview

This project demonstrates a complete cloud-native CI/CD workflow for deploying a dual-service web app:

🐍 Flask Backend → simple REST API returning JSON

⚡ Express Frontend → displays messages from the backend

You’ll find step-by-step Dockerization, AWS ECR + ECS production deployment, and local Kubernetes orchestration via Minikube.

📂 Repository Structure
aws-flask-express-k8s/
├── Backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── Frontend/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
│
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
│
├── docker-compose.yml         # optional (Task 2 reference)
└── README.md                  # you are here

⚙️ Task 1 – Docker Setup & Local Testing
Build Images
docker build -t flask-backend ./Backend
docker build -t express-frontend ./Frontend

Run Containers Locally
docker run -d -p 5000:5000 flask-backend
docker run -d -p 3000:3000 express-frontend


Verify:

curl http://localhost:5000
# → {"message":"Hello from Flask backend!"}

curl http://localhost:3000
# → Express frontend is running 🚀

☁️ Task 2 – AWS ECR + ECS (Production Deployment)
1️⃣ Create ECR Repositories

In AWS ECR Console:

flask-backend

express-frontend

2️⃣ Authenticate Docker
aws ecr get-login-password --region ap-southeast-2 \
| docker login --username AWS --password-stdin 215764923642.dkr.ecr.ap-southeast-2.amazonaws.com

3️⃣ Tag & Push Images
docker tag flask-backend:latest 215764923642.dkr.ecr.ap-southeast-2.amazonaws.com/flask-backend:latest
docker push 215764923642.dkr.ecr.ap-southeast-2.amazonaws.com/flask-backend:latest

docker tag express-frontend:latest 215764923642.dkr.ecr.ap-southeast-2.amazonaws.com/express-frontend:latest
docker push 215764923642.dkr.ecr.ap-southeast-2.amazonaws.com/express-frontend:latest

4️⃣ ECS Deployment

Create Cluster → flask-express-cluster

Create Task Definitions → (Backend Port 5000, Frontend Port 3000)

Create Services → Launch both containers under same VPC/Security Group

Confirm running tasks from ECS console.

☸️ Task 3 – Kubernetes Deployment with Minikube (Local)
1️⃣ Start Cluster
minikube start --driver=docker
kubectl get nodes

2️⃣ Build Images inside Minikube
eval $(minikube docker-env)
docker build -t flask-backend ./Backend
docker build -t express-frontend ./Frontend

3️⃣ Apply K8s Manifests
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml


Verify:

kubectl get pods
kubectl get svc

4️⃣ Expose Frontend (NodePort)
minikube service express-frontend-service


This opens:

http://127.0.0.1:<random-port>


✅ Page shows:

“Express frontend is running 🚀
Using Flask backend: http://flask-backend-service:5000

Response: Hello from Flask backend!”

🧩 Kubernetes Architecture Overview
[Express Frontend Pod]  ←→  [Flask Backend Pod]
        |                         |
   express-frontend-svc      flask-backend-svc
        \___________________/
           Cluster Internal DNS

   [Minikube NodePort → localhost] 
           ⇩
      Browser access

🧪 Verification Commands
kubectl get all
kubectl logs <backend-pod-name>
kubectl logs <frontend-pod-name>
minikube dashboard

