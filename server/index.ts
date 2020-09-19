import express from "express"
import http from "http"
import * as WebSocket from "ws"
import { createRoom } from "./game"

const app = express()
const server = http.createServer(app)
const ws = new WebSocket.Server({ server: server })
const port = 3030

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000") // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

const events = {
  set_name: (str: any) => console.log(str),
  new_room: (str: any) => console.log(str),
}

export type EventNames = keyof typeof events

ws.on("connection", (socket, req) => {
  socket.on("message", (data) => {
    if (typeof data === "string") {
      try {
        const obj = JSON.parse(data) as {
          type: EventNames
          payload: string
        }
        events[obj.type](obj.payload)
      } catch (error) {
        socket.send("Server error")
        console.error(error)
      }
    }
  })
})

server.listen(port, () => {
  console.log(`Serving on port: ${port}`)
})
