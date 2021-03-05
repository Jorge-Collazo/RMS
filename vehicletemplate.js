const faker = require('faker');
const fs = require('fs')
function generateUsers() {
  let users = []
  for (let id=1; id <= 100; id++) {
    firstname = faker.name.firstName();
    lastname = faker.name.lastName();
    phonenumber = faker.phone.phoneNumber();
    city = faker.address.city();
    state = faker.address.state();
    country = faker.address.country();
    licenseplate = faker.random.number();
    vehicle = faker.vehicle.vehicle();
    colorofcar = faker.vehicle.color();
    vin = faker.vehicle.vin();
    model = faker.vehicle.model();
    type = faker.vehicle.type();
    owners = faker.name.findName();
    value = faker.finance.amount();
    users.push({
        "id": id,
        "first_name": firstname,
        "last_name": lastname,
        "phone_number": phonenumber,
        "city": city,
        "licenseplate": licenseplate,
        "vehicle": vehicle,
        "color_of_car": colorofcar,
        "vin": vin,
        "model": model,
        "type": type,
        "owners": owners,
        "value": value,
    });
  }
  return { "data": users }
}
let dataObj = generateUsers();
fs.writeFileSync('vehicletemplate.json', JSON.stringify(dataObj, null, '\t'));