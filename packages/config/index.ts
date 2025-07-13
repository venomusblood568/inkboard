import dotenv from "dotenv";
import path from "path";

dotenv.config({path:path.resolve(__dirname,"../../.env")})

export const ENV = {
    JWT_SECRET : getEnv("JWT_SECRET"),
}

function getEnv(key:string): string{
    const value = process.env[key];
    if(!value){
        throw new Error(`Missing environment variable: ${key}`)
    }
    return value
}