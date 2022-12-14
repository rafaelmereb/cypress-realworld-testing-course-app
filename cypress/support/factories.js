import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

export default {

    person: () => ({
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sex: faker.name.sex(),
        cpf: generate({ format: true })
    }),

    people: (numberOfPeople) => Cypress._times(numberOfPeople, () => this.person()),

    company: () => ({
        name: faker.company.name(),
        suffix: faker.company.companySuffix(),
    }),

}