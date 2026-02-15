import { MobileInterface } from "@/components/ui/MobileInterface"
import { Scene } from "@/components/canvas/Scene"

export default function Home() {
  return (
    <main className="w-full h-[100dvh]">
      <MobileInterface>
        <Scene />
      </MobileInterface>
    </main>
  )
}
