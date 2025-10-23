# Backend/Dockerfile

# 1️⃣ Base image
FROM python:3.11-slim

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy dependency list and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4️⃣ Copy all backend files (including app.py)
COPY . .

# 5️⃣ Expose Flask port
EXPOSE 5000

# 6️⃣ Run the Flask app
CMD ["python", "app.py"]
