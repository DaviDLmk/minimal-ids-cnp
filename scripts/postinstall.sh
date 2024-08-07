#!/bin/bash

env_file=".env"
sample_file=".env.sample"

if [ ! -f "$env_file" ]; then
    cp "$sample_file" "$env_file"
    echo "Copied $sample_file to $env_file"
else
    echo "$env_file already exists, skipping copy"
fi