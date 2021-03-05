const faker = require('faker');
const fs = require('fs')
const Incidents = ['Robbery 211', 'Threat 236', 'Drugs 237', 'Assault 240', 'Weapons Violations 245', 'Rape 261', 'Fraud 318', 'Drunk Driver 390D', 'Subject Disturbing 415', 'Criminal Damage 415B', 'Violation of Court Order 415O', 'Trespassing 418T', 'Homicide 451', 'Burglary 459', 'Theft 487', 'Missing Persons 601', 'Suspicious person/activity 647', 'Dead Body 901H', 'Insane Person 918', 'Collision 961'];
function generateUsers() {
    let users = []
    for (let id = 1; id <= 100; id++) {
        let firstName = faker.name.firstName();
        let lastname = faker.name.lastName();
        let phonenumber = faker.phone.phoneNumber();
        let city = faker.address.city();
        let state = faker.address.state();
        let country = faker.address.country();
        let witness = faker.name.firstName();
        let victim = faker.name.firstName();
        let officername = faker.name.lastName();
        let locationinfo = faker.address.streetAddress();
        let date = faker.date.recent();
        let info = faker.lorem.text();
        let badgenumber = faker.random.number();
        //let incident = incident[faker.random.number];
        users.push({
            "id": id,
            "first_name": firstName,
            "last_name": lastname,
            "phonenumber": phonenumber,
            "city": city,
            "state": state,
            "country": country,
            "witness": witness,
            "victim": victim,
            "officername": officername,
            "locationinfo": locationinfo,
            "date": date,
            "info": info,
            "badgenumber": badgenumber,
        });
    }
    return { "data": users }
}
let dataObj = generateUsers();
fs.writeFileSync('incidenttemplate.json', JSON.stringify(dataObj, null, '\t'));






















