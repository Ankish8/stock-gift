import { IPhone14ProMaxMockup } from "@/components/iphone-14-pro-max-mockup"
import SelectStock from "@/components/select-stock"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <IPhone14ProMaxMockup>
        <SelectStock />
      </IPhone14ProMaxMockup>
    </main>
  )
}

