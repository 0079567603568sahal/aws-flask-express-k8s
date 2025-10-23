�
� AWS Flask-Express K8s
 Full-Stack Deployment with Flask Backend + Express Frontend using Docker, AWS
 ECR/ECS, and Kubernetes (Minikube)
 📘 Overview
 This project demonstrates a complete end-to-end deployment pipeline for a simple full-stack web
 application built with:
 • 
• 
�
� 
⚡ 
Flask (Python) → Backend API returning JSON 
Express (Node.js) → Frontend displaying backend responses 
It covers: 1. Docker containerization 2. AWS ECR + ECS (Production-grade cloud deployment) 3.
 Kubernetes deployment on Minikube (local cluster)
 Each step reflects real-world DevOps workflow — from image creation to cloud orchestration.
 🧩 Project Structure
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
 ├── docker-compose.yml        # (Reference from Task 2)
 └── README.md
 1
�
� Task 1 – Docker Setup & Local Testing
 Step 1️⃣ Build Docker Images
 docker build-t flask-backend ./Backend
 docker build-t express-frontend ./Frontend
 Step 2️⃣ Run Containers
 docker run-d-p 5000:5000 flask-backend
 docker run-d-p 3000:3000 express-frontend
 Step 3️⃣ Verify Application
 curl http://localhost:5000
 # → {"message": "Hello from Flask backend!"}
 curl http://localhost:3000
 # → Express frontend is running 🚀
 ☁
 ️ Task 2 – Deploy to AWS ECR + ECS (Cloud Deployment)
 Step 1️⃣ Create ECR Repositories
 In AWS Console → ECR → Create: - 
flask-backend - 
express-frontend
 Step 2️⃣ Authenticate Docker with ECR
 aws ecr get-login-password--region ap-southeast-2
 | docker login--username AWS--password-stdin 215764923642.dkr.ecr.ap
southeast-2.amazonaws.com
 Step 3️⃣ Tag & Push Docker Images
 # Backend
 docker tag flask-backend:latest 215764923642.dkr.ecr.ap
southeast-2.amazonaws.com/flask-backend:latest
 docker push 215764923642.dkr.ecr.ap-southeast-2.amazonaws.com/flask
backend:latest
 # Frontend
 docker tag express-frontend:latest 215764923642.dkr.ecr.ap
southeast-2.amazonaws.com/express-frontend:latest
 2
docker push 215764923642.dkr.ecr.ap-southeast-2.amazonaws.com/express
frontend:latest
 Step 4️⃣ ECS Cluster Setup
 • 
• 
• 
• 
• 
• 
Create ECS Cluster → 
flask-express-cluster
 Create Task Definitions:
 Flask Backend → Port 
5000
 Express Frontend → Port 
3000
 Create Services → assign same VPC & security group
 Confirm both services running on ECS Console
 ☸
 ️ Task 3 – Kubernetes Deployment (Minikube)
 Step 1️⃣ Start Minikube
 minikube start--driver=docker
 kubectl get nodes
 Step 2️⃣ Build Images Inside Minikube
 eval $(minikube docker-env)
 docker build-t flask-backend ./Backend
 docker build-t express-frontend ./Frontend
 Step 3️⃣ Deploy to Kubernetes
 kubectl apply-f k8s/backend-deployment.yaml
 kubectl apply-f k8s/backend-service.yaml
 kubectl apply-f k8s/frontend-deployment.yaml
 kubectl apply-f k8s/frontend-service.yaml
 Step 4️⃣ Verify Deployments
 kubectl get pods
 kubectl get svc
 🖥 Step 5️⃣ Access the Frontend
 Expose service: 
3
minikube service express-frontend-service
 Output: 
| default | express-frontend-service | 3000 | http://127.0.0.1:57993 |
 🔑 Open the URL — you’ll see:
 Express frontend is running 🚀
 Using Flask backend: 
http://flask-backend-service:5000
 Response: Hello from Flask backend!
 🧠 Kubernetes Architecture
 [Express Frontend Pod] ───> [Flask Backend Pod]
        │                         │
 express-frontend-svc      flask-backend-svc
        │                         │
     NodePort                 ClusterIP
        └──────── Local Access via Minikube ────────┘
 🧪 Debugging & Verification Commands
 kubectl logs <pod-name>
 kubectl describe pod <pod-name>
 kubectl get all
 minikube dashboard
 📸 Screenshots for Submission
 🔑 Include the following: 1. 
# View logs
 # Pod info
 # List all K8s resources
 # GUI dashboard
 kubectl get pods 2. 
frontend page) 4. Optional: Minikube dashboard
 🗾 Learning Outcomes
 ✔ Build & deploy multi-container apps using Docker
 ✔ Push Docker images to AWS ECR & deploy via ECS
 ✔ Configure Kubernetes deployments & services
 kubectl get svc 3. Browser output (Express4
✔ Understand Pod-to-Service communication
 ✔ Gain real-world DevOps & Cloud deployment workflow
 👤 Author
Muhammed Sahal SR
 🎓 MSc Computer Science | Kerala University (NAAC A++)
 💼 Cloud, AI & DevOps Engineer | Music Producer | Educator
 📍 Kerala, India
 📧 mohdsahal924@gmail.com
 🔗 GitHub: 
0079567603568saha
