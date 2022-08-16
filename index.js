

const { request, response } = require("express")
const express = require("express")

const fs = require("fs")

const fsPromises = require("fs/promises") 
const app = express()



app.get("/", (request,response) =>{

    response.write("hola bienvenido a nuestra api Express")
    response.end()
})

app.get("/files-callbacks", (request, response)=> {
    fs.readFile("text1.txt", "utf8", (err, data)=>{

        if (err){
            response.write(err)
            response.end()
        }

        response.write(data)
        response.end()
    })
})

app.get("/files-promises", (request, response)=> {
    fsPromises.readFile("text1.txt", "utf8")

    .then((data)=>{
        response.write(data)
        response.end()
    })

    .catch((error)=>{
        response.write(error)
        response.end()
    })
})


app.get("/file-awaits-async", async (request, response) =>{
    try{
    const file = await fsPromises.readFile("text1.txt", "utf8")
        response.write(file)
        response.end()
}catch(error){
    response.write(error)
    response.end()
}

    
    

})

app.get("/koders", async (request, response) =>{

    const db = await fsPromises.readFile("koders.json", "utf8")

    response.send(db)
    response.end()
})




app.listen("8080", ()=>{

    console.log("servidor Escuchando")
})