import Head from "next/head"
import { useState } from "react"
import { useWebsocket } from "./useWebsocket"

const Home = () => {
  const ws = useWebsocket()
  const [name, setName] = useState("")
  return (
    <div className='container'>
      <Head>
        <title>Salad bowl</title>
      </Head>
      <input
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <button
        onClick={async () => {
          ws.send({
            type: "set_name",
            payload: name,
          })
        }}
      >
        Submit
      </button>
    </div>
  )
}

export default Home
