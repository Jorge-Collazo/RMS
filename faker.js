var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

app.post('/',(req,res)=>{  
    for(var i=0; i<10;i++){  
      var fakke = new fakerModel({  
      firstname:faker.name.firstName(),  
      lastname:faker.name.lastName(),  
      phonenumber:faker.phone.phoneNumber(),  
      city:faker.address.city(),  
      state:faker.address.state(),  
      country:faker.address.country()  
        })  
        fakke.save((err,data)=>{  
             if(err){
            console.log('error occured',err)  
            }
        })  
    }  
    res.redirect('/');  
  })  
  app.post('/',(req,res)=>{  
    for(var i=0; i<10;i++){  
      var fakke = new fakerModel({  
      firstname:faker.name.firstName(),  
      lastname:faker.name.lastName(),  
      phonenumber:faker.phone.phoneNumber(),  
      city:faker.address.city(),  
      state:faker.address.state(),  
      country:faker.address.country()  
        })  
        fakke.save((err,data)=>{  
             if(err){
            console.log('error occured',err)  
            }
        })  
    }  
    res.redirect('/');  
  })  
  app.post('/',(req,res)=>{  
    for(var i=0; i<10;i++){  
      var fakke = new fakerModel({  
      firstname:faker.name.firstName(),  
      lastname:faker.name.lastName(),  
      phonenumber:faker.phone.phoneNumber(),  
      city:faker.address.city(),  
      state:faker.address.state(),  
      country:faker.address.country()  
        })  
        fakke.save((err,data)=>{  
             if(err){
            console.log('error occured',err)  
            }
        })  
    }  
    res.redirect('/');  
  })  