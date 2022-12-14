import { defineConfig } from "cypress";
import { faker } from '@faker-js/faker';
import * as pg from 'pg';
const { Pool } = pg

export default defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true, // enabling cy.session
    chromeWebSecurity: false, // handling redirections

    setupNodeEvents(on, config) {
      on('task', {

        helloWorld() {
          return 'Hello World!'
        },

        readFixture(fileName: string) {
          return require(`./cypress/fixtures/${fileName}`)
        },

        readExampleFixture() {
          return this.readFixture('example.json')
        },

        randomNumberBetween({ min, max }) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1) + min);
        },

        generateRandomNumberBetweenOneAndTen() {
          return this.randomNumberBetween(1, 10)
        },

        greeting(name) {
          return `Hello, ${name}! How are you doing today?`
        },

        getMyObjectWith({ name, age, sex }) {
          return { name, age, sex }
        },

        generateUuidUsingFaker() {
          return faker.datatype.uuid()
        },

        "generate_/\_modified_/\_uuid": () => {
          // funcao definida com caracteres especiais e com uma arrow function
          return faker.datatype.uuid().replace(/-/g, '_/\\_')
        },

        doStuff() {
          return faker.hacker.phrase()
        },

        async "db:connect"({ dbConfig }) {
          const pool = new Pool(dbConfig)
          try {
            return pool.query("SELECT NOW()")
          } catch (error) {
            console.log(error)
          } finally {
            pool.end()
          }
        },

        async "db:query"({ dbConfig, sql, values }) {
          const pool = new Pool(dbConfig)
          try {
            return pool.query(sql, values)
          } catch (error) {
            console.log(error)
          } finally {
            pool.end()
          }
        },

        async "db:reset"(dbConfig) {
          const pool = new Pool(dbConfig)
          try {
            const SQL_RESET = "TRUNCATE TABLE movies" // example
            return pool.query(SQL_RESET)
          } catch (error) {
            console.log(error)
          } finally {
            pool.end()
          }
        },

      })

    },

    env: {
      API_BASE_URL: "https://api.typeform.com",

      DB: {
        "user": "postgres",
        "host": "localhost",
        "database": "dvd_rental",
        "password": "postgres",
        "port": 5432,
      },
    }
  },

});
