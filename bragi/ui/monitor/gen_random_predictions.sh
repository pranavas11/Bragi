#!/bin/bash

# Generate random predictions in [0, 1]
for ((;;))
do
  echo 0.$((RANDOM % 100))
  sleep 1
done
