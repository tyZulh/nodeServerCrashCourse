const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

const port = 4001
const path = '/home/tyzulh/Project/serverNode/json/killers.json'

app.get('/', (req, res) => {

  res.status(200).send(' Stay a while and listen...')
})

app.get('/killers', (req, res, err) => {

  fs.readFile(path ,(error, data) => {
    if(error) {
      throw error
    }
    let killers = JSON.parse(data)
    res.status(200).send(killers)
  })
})

app.get('/task/:task', (req, res, err) => {
  const task = req.params.task
  fs.readFile(path ,(error, data) => {
    if(error) {
      throw error
    }
    let killers = JSON.parse(data)
    const killersFiltered = []
    killers.killer.map(killer => {
      if(killer.task.includes(task)) {
        killersFiltered.push(killer)
      }
    })
    res.status(200).send(killersFiltered)
    
  })
})

app.listen(port, (err) => {
  if(err) {
    throw new Error('Something went south ...', err)
  }
  console.log(`Server is listening on ${port}`);
  
})