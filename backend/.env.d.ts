declare namespace NodeJS {
  export interface ProcessEnv {
    OPEN_WEAHTER_API_KEY: string;
    JWT_SECRET: string;

    DB_PORT: number;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}
