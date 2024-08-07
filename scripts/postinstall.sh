#!/bin/bash

env_file=".env"
sample_file=".env.sample"

if [ ! -f "$env_file" ]; then
    cp "$sample_file" "$env_file"
    echo "Copied $sample_file to $env_file"
else
    echo "$env_file already exists, skipping copy"
fi

env_provider_file=".env.provider"
sample_provider_file=".env.provider.sample"

if [ ! -f "$env_provider_file" ]; then
    cp "$sample_provider_file" "$env_provider_file"
    echo "Copied $sample_provider_file to $env_provider_file"
else
    echo "$env_provider_file already exists, skipping copy"
fi

env_consumer_file=".env.consumer"
sample_consumer_file=".env.consumer.sample"

if [ ! -f "$env_consumer_file" ]; then
    cp "$sample_consumer_file" "$env_consumer_file"
    echo "Copied $sample_consumer_file to $env_consumer_file"
else
    echo "$env_consumer_file already exists, skipping copy"
fi