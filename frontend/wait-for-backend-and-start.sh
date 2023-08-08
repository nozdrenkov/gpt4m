#!/bin/sh

while ! nc -z backend 5555; do
  echo "Waiting for Backend service..."
  sleep 2
done

npm run start