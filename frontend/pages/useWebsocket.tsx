import { useEffect, useState } from "react"
import { EventNames } from "../../server/index"

export type MyEvent = { type: EventNames; payload: any }

export const useWebsocket = () => {
  const [send, setSend] = useState<(obj: MyEvent) => void | null>(null)

  const createWebsocket = () => {
    const ws = new window.WebSocket("ws://localhost:3030")

    ws.addEventListener("open", () => {
      setSend(() => (obj) => {
        ws.send(JSON.stringify(obj))
      })
    })

    ws.addEventListener("message", (data) => {
      console.log(data)
    })

    ws.addEventListener("close", () => {
      setTimeout(createWebsocket, 1000)
    })

    return ws
  }

  useEffect(() => {
    const ws = createWebsocket()

    return () => {
      ws.close()
    }
  }, [])
  return { send }
}
