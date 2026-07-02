//N1IRmKaRHkbdnmE3
const {MongoClient}=require("mongodb")

const URL ='mongodb+srv://devTinder:N1IRmKaRHkbdnmE3@cluster0.pqhqbce.mongodb.net/?appName=Cluster0'



async function mongodbConnect() {
    try {
        const client =new MongoClient(URL);
        await client.connect();
        console.log("mongodb connect successfully to server");
        const db=client.db("dev_tinder");
        const collection=db.collection("Users");
       
        const data={
            firstName:"Sunny",
            lastName:"Mallick",
            city:"Kolkata",
            phoneNumber:"62971179586"
        }


        const insertResult=await collection.insertOne(data);
        console.log("insert result : ", insertResult)


        return "done";


        
    } catch (error) {
        console.log(error)
    }
}



mongodbConnect().then(console.log).catch(console.error)