// import mongoose from 'mongoose';
// import { caching, HttpError } from '../tools';

// const originalExec = mongoose.Query.prototype.exec;
// // const client = caching.getClient();

// // @ts-ignore
// mongoose.Query.prototype.cache = function(options: {key: string} = {}) {
//     // @ts-ignore
//     this.useCache = true;
//      // @ts-ignore
//     this.hashKey = options.key;
//     return this;
// }

// mongoose.Query.prototype.exec = async function() {
//     // @ts-ignore
//     if(!this.useCache || !this.hashKey){
//         return originalExec.apply(this, arguments as any);
//     }
//     const key = JSON.stringify({...this.getQuery(), collection: this.model.collection.name});
//     // @ts-ignore
//     const hashKey = this.hashKey as string;
//     // const cached = await client.hGet(hashKey, key);
//     // if(cached){
//     //     const doc = JSON.parse(cached);

//     //     return Array.isArray(doc)
//     //         ? doc.map(d => new this.model(d))
//     //         : new this.model(doc);
//     // }
//     const result = await originalExec.apply(this, arguments as any);
//     // EX - expiration time in seconds
//     console.log('Caching ', key)
//     await client.hSet(hashKey, key, JSON.stringify(result));
//     client.expireAt(hashKey, new Date(Date.now() + 100000));
//     return result;
// }

// export async function clearHash(key: string) {
//     try{
//         console.log('USER Id: ', key)
//         console.log('CLEAR Hash');
//         const del = await client.del(key);
//         console.log('RESULT ', del)

//     }
//     catch(err: any) {
//         throw new HttpError(`RedisError: ${err.message}`,500, err)
//     }
// }
