import { PrismaClient } from "@prisma/client"

//A cada compilação feita no código irá fazer uma nova conexão com o banco.
//Portanto este código garante que não haverá multiplas conexões com o db.
declare global {
  // eslint-disable-next-line no-unused-vars
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
