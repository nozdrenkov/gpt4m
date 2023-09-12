FROM --platform=linux/amd64 python:3.10-slim
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    g++ \
    pandoc \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*

RUN which pandoc

ENV PATH="/usr/bin:${PATH}"

COPY . /app
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# CMD ["python", "ingest.py"]

EXPOSE 5000
CMD ["python", "privateGptServer.py"]