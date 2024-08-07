import dotenv from 'dotenv';

dotenv.config();

interface IEnvVariables {
  PORT: number;
  NODE_ENV: 'development' | 'TEST' | 'staging' | 'production';
  DATABASE_URL: string;
}

const getEnvVariable = (key: keyof IEnvVariables): string | number => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  if (key === 'PORT') {
    return parseInt(value, 10);
  }

  return value;
};

export const env: IEnvVariables = {
  NODE_ENV: getEnvVariable('NODE_ENV') as IEnvVariables['NODE_ENV'],
  PORT: getEnvVariable('PORT') as IEnvVariables['PORT'],
  DATABASE_URL: getEnvVariable('DATABASE_URL') as IEnvVariables['DATABASE_URL'],
};
