FROM node:16-slim
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y netcat && \
    npm install && npm run build
EXPOSE 3000
CMD ["./wait-for-backend-and-start.sh"]
