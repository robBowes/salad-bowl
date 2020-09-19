import { createMachine, interpret } from "xstate"
import crypto from "crypto"

const room = createMachine({
  id: "room",
  initial: "",
  states: {
    inactive: { on: { TOGGLE: "active" } },
    active: { on: { TOGGLE: "inactive" } },
  },
})

export const createRoom = (id: string) => {
  const name = crypto
    .randomBytes(3)
    .toString("hex")
    .split("")
    .reduce((acc, el, i) => {
      if (i % 4 === 3) {
        acc.push("-")
      }
      acc.push(el)
      return acc
    }, [] as string[])
    .join("")
  return name
}
