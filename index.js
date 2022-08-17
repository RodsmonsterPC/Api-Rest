

const { request, response } = require("express")
const express = require("express")

const fs = require("fs")

const fsPromises = require("fs/promises") 
const app = express()

app.use(express.json()) //parseando json


// app.get("/", (request,response) =>{

//     response.write("hola bienvenido a nuestra api Express")
//     response.end()
// })

// app.get("/files-callbacks", (request, response)=> {
//     fs.readFile("text1.txt", "utf8", (err, data)=>{

//         if (err){
//             response.write(err)
//             response.end()
//         }

//         response.write(data)
//         response.end()
//     })
// })

// app.get("/files-promises", (request, response)=> {
//     fsPromises.readFile("text1.txt", "utf8")

//     .then((data)=>{
//         response.write(data)
//         response.end()
//     })

//     .catch((error)=>{
//         response.write(error)
//         response.end()
//     })
// })


// app.get("/file-awaits-async", async (request, response) =>{
//     try{
//     const file = await fsPromises.readFile("text1.txt", "utf8")
//         response.write(file)
//         response.end()
// }catch(error){
//     response.write(error)
//     response.end()
// }

    
    

// })
// app.get("/koders/:id", async (request, response) => {
//     // Path params
//     const { params } = request
  
//     // DB
//     const db = await fsPromise.readFile("koders.json", "utf8")
//     const parsedDB = JSON.parse(db)
  
//     // Filtramos para encontrar al koder con identiciador 2
//     const foundKoder = parsedDB.koders.filter((koder) => koder.id === Number(params.id))
  
//     // Respondemos
//     response.json(foundKoder[0])
//   })


  app.get("/koders", async (request, response) => {
    
  
    const { query } = request
    console.log(query)
    const db = await fsPromises.readFile("koders.json", "utf8") 
    const parsedDB = JSON.parse(db)
    if (Object.keys(query).length){

      const foundKoder = parsedDB.koders.filter((koder) => koder.modulo === query.modulo && 
                                                  koder.generacion === query.generacion  &&
                                                  koder.name === query.name && 
                                                  koder.edad === Number(query.edad)
                                                  && koder.hobbies === query.hobbies)
      response.json(foundKoder)
    }
   
    else{
      response.json(parsedDB.koders)
    }
  })




app.post("/koders", async (request, response) =>{
  const {body} = request

  const bd = await fsPromises.readFile("koders.json", "utf8")
  const parseDB = JSON.parse(bd)

  const newKoder = {
    id: parseDB.koders.length + 1,
    ...body
  }
  
  parseDB.koders.push(newKoder)
  
  await fsPromises.writeFile("koders.json", JSON.stringify(parseDB, "\n", 2), "utf8")
  
  response.json(newKoder)

})

app.put("/koders/:id", async (request, response) => {
    // Path params
    const { params } = request
    const {body} = request
    // DB
    const db = await fsPromises.readFile("koders.json", "utf8")
    const parsedDB = JSON.parse(db)
  
    // Filtramos para encontrar al koder con identiciador 2
    const foundKoder = parsedDB.koders.filter((koder) => koder.id === Number(params.id))
  
    const newKoder ={
      id: Number(params.id),
      ...body
    }

    foundKoder.koders.push(newKoder)

    await fsPromises.writeFile("koders.json", JSON.stringify(parsedDB, "\n", 2), "utf8")
    // Respondemos
    response.json(parsedDB)
  })




app.listen("8080", ()=>{

    console.log("servidor Escuchando")
})