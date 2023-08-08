FROM --platform=linux/amd64 python:3.10-slim
WORKDIR /app

# Install essential tools and g++ compiler
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    g++ \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*

COPY . /app
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["python", "privateGptServer.py"]
