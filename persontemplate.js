const faker = require('faker');
const fs = require('fs')
function generateUsers() {
  let users = []
  for (let id=1; id <= 100; id++) {
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    let phonenumber = faker.phone.phoneNumber();
    let city = faker.address.city();
    let state = faker.address.state();
    let country = faker.address.country();
    let height = faker.random.number();
    let weight = faker.random.number();
    let witness = faker.name.firstName();
    let victim = faker.name.firstName();
    let race = faker.commerce.color();
    let gender = faker.name.gender();
    users.push({
        "id": id,
        "firstname": firstname,
        "lastname": lastname,
        "city": city,
        "state": state,
        "height": height,
        "weight": weight,
        "witness": witness,
        "phonenumber": phonenumber,
        "victim": victim,
        "race": race,
        "gender": gender,
        "country": country,
    });
  }
  return { "data": users }
}
let dataObj = generateUsers();
fs.writeFileSync('persontemplate.json', JSON.stringify(dataObj, null, '\t'));