const travels = require("../models/travels.json");
const utils = require("../utils/travelsUtils");
const fs = require("fs");
const passengers = require("../models/passengers.json");
const { response } = require("express");

//ver todas as viagens disponíveis
const getAllTravels = (req, res) => {
res.status(200).send(travels)
};

//pesquisar uma viagem por id
const getTravelsById = (req, res) => {

    let idRequerido = req.params.id;
    
    
    let filteredTravel = utils.findById(travels, idRequerido);

    res.status(200).send(filteredTravel);
}

//adicionar um novo passageiro a uma viagem, recebendo da requisiçao nome, email e id da viagem
const createPerson = (req, res) => {

    let { name, email, documentNumber} = req.body

    let newPeople = {id: Math.random().toString(32).substr(2),
        name,
        email,
        documentNumber
        };

        let travelRequiredId = req.params.id;

        let travelRequired = utils.findById(travels, travelRequiredId);


        travels.forEach((travel)=>{
            let sameTravel = travel === travelRequired;

            if (sameTravel)  {
                travel.passengersInfos.push(newPeople);
            };

        });
 fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err){
     if (err){
         res.status(500).send({
             "message": err 
         })
     } else {
         res.status(200).send({"message":"Passageiro adcionado a viagem com sucesso", travelRequired})
     }
 });
       
};

// deletar um passageiro do sistema
 const deletePerson = (req, res) =>  {
     const requestId = req.params.id; 

     const filteredPerson = utils.findById(passengers, requestId);

     const index = passengers.indexOf(filteredPerson); 

     if (index >= 0) {
         passengers.splice(index,1);

         fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), "utf8", (err) =>{
             if (err) {
                 res.status(500).send({
                     "message": err 
                 })
             } else {
                 res.status(200).send({
                     "message": "PAssageiro excluido com sucesso", passengers
                 })
             }
         })

     }
    };

//atualizar um passageiro no sistema
 const updatePerson = (req, res) =>{

        const requiredId = req.params.id;

        const {name, email,documentNumber} = req.body;

         let filteredPassenger = utils.findById(passengers, requiredId);

         const updatePassenger = {
             id: requiredId,
             name,
             email,
             documentNumber,
             travelId: filteredPassenger.travelId
         };

        const index = passengers.indexOf(filteredPassenger)

         if (index >= 0){
            passangers.splice(index, 1, updatePassenger);
           
           fs.writeFile("./src/models/passangers.json", JSON.stringify(passengeres),
            "utf8", (err) =>{
                if (err) {
                    res.status(500).send({
                       "message": err
                    });
                } else {
                    res.status(200).json([{ 
                        "mesagem": "Passageiro atualizado com sucesso", 
                        filteredPassenger

                   }])
               }
           })
         }
     }
//editar nome do passageiro no sistema
const updateName = (req, res) => {
    const requiredId = req.params.id;
    let newName = req.body.name;
    // console.log(requiredId)

    let filteredPassenger = utils.filterById(passengers, requiredId);
    // console.log('PASSENGER', filteredPassenger);

    // console.log(filteredPassenger)
    if (filteredPassenger) {
        // console.log(filteredPassenger)
        filteredPassenger.name = newName;

        fs.writeFile("./src/models/passengers.json", JSON.stringify(passengers), 'utf8', function(err) {
            if (err) {
                res.status(500).send({ message: err }) // caso de erro retorno status 500
            } else {
                res.status(200).json([{
                    "mensagem": "Nome do passageiro atualizado com sucesso",
                    filteredPassenger
                }]);
            }
        })
    } else {
        res.status(500).send({ "message": "Passageiro não encontrado" })
    }
}

//deletar uma viagem
const deleteTravel = (req, res) =>{
    const requiredId = req.params.id;

    let filteredTravel = utils.findById(travels, requiredId);

   res.status(200).json([{
       "mensagem": "Viagem deletada com sucesso", 
       filteredTravel
       
   }]);
};

//cadastrar todas as informações de um novo motorista em uma viagem
const createDriver = (req, res) =>{

    let idreq = req.params.id;
    const { name, license} = req.body 

    let newDriver = {
        id: Math.random().toString(32).substr(2),
        name,
        license,
    }

    let filteredTravel = utils.findById(travels, idreq)

    travels.forEach((travels) => {
        let sameTravel = travels == filteredTravel
        if(sameTravel){
            travels.driverInfos = []
            travels.driverInfos.push(newDriver)
        }
    })
    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err){
        if (err) {
            res.status(500).send ({
                "message": err
            })
        } else{
            res.status(200).send({ "message": "Motorista criado e adicionado  á viagem com sucesso",
            filteredTravel
            })
        }
    })

    
    
};

//editar qualquer dado do motorista
const updateDriver = (req, res) =>{

    const requiredId = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newLicense = req.body.license;

    const filteredDriver = utils.findById(travels, requiredId);

    if (filteredDriver){
        filteredDriver.id = newId
        filteredDriver.name = newName
        filteredDriver.license = newLicense
    }
fs.writeFile(".src/models/travels.json", JSON.stringify(travels), 'utf8', function(err){
    if (err) {
        res.status(500).send({message: err})
    }else {
        res.status(200).json([{
            "message": "informação do motorista alterada com sucesso"
        }])
    }
})
//     const updateDriver ={
//         id: requiredId,
//         name,
//         license,
//         travelId: filteredDriver.travelId
//     };
// const index = travels.indexOf(filteredDriver);

// if (index >= 0 ){
//     travels.splice(index, 1, updateDriver);
// }
 }
//substituir motorista
const replaceDriver = (req, res) =>{

const requiredId = req.params.id;

const {id, name, license} = req.body;

let filteredDriver = utils.findById(travels, requiredId)

const index = travels.indexOf(filteredDriver)

let newDriver = {
    id,
    name,
    license
}

if (index >=0) {
    travels.splice(index,1, newDriver)

    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err){
        if (err) {
            res.status(500).send({"message": err})
        } else {res.status(200).send({
            "message": "motorista atualizado com sucesso"
        })}
    });
};

}
//ordenar viagens com número de passageiros
const getAllPassengerCapacity = (req, res) => {

const filteredTravel = travels.filter(quant => quant.busInfos.capacity > 0);

const capacitySort = filteredTravel.sort(function(a,b){

    return (a.busInfos.capacity > b.busInfos.capacity) ? 1 :((b.busInfos.capacity > a.busInfos.capacity) ? -1 : 0);
})
res.status(200).send(capacitySort);
}

module.exports = {
    getAllTravels,
    getTravelsById,
    createPerson,
    deletePerson,
    updateName,
    updatePerson,
    deleteTravel,
    createDriver,
    replaceDriver,
    updateDriver,
    getAllPassengerCapacity } 
