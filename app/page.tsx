import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import BarbershopItem from "./_components/barbershop-item"
import { db } from "./_lib/prisma"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const PopularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return (
    <div>
      {/* Header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, André!</h2>
        <p>Quarta-feira, 07 de agosto.</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={16}
                height={16}
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* IMAGE */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende com os melhores FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {PopularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
