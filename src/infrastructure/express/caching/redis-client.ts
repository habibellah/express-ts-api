import { createClient } from "redis";
/*
the redis is implemented in a learning purpose the caching mechanisme has use cases to implement ,
and in our example is the not the best case to impelement caching
*/
export class RedisClient{
    private client;

    constructor(){
        this.client = createClient();
        this.client.connect();
    }

    async set(key : string, value : string, ttl : number){
        await this.client.set(key,value,{EX: ttl});
    }

    async get(key : string){
        return await this.client.get(key);
    }

    async delete(key : string){
        await this.client.del(key);
    }
}