import { createFileRoute } from "@tanstack/react-router"
import { useState, Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { langData } from "@/lib/data"
import { type SbpFormData } from "@/lib/types"
import SbpLogo from "@/assets/sbpLogo.svg"
import SbpColorLine from "@/components/SbpColorLine"
import SbpForm from "@/components/SbpForm"
import QrCode from "@/components/QrCode"
import ImageGen from "@/components/ImageGen"
import { addUser, getPageId } from "@/lib/functions"

export const Route = createFileRoute("/")({ component: App })

const defaultFormData: SbpFormData = {
  name: "",
  exp: 0,
  langs: [],
  github: "",
  page: "",
  sendEmail: false,
}

function App() {
  const [isSubmited, setIsSubmited] = useState<boolean>(false)
  const [selectedLangs, setSelectedLangs] = useState<string[]>([])
  const [formData, setFormData] = useState<SbpFormData>(defaultFormData)

  const handleSelect = (lang: string) => {
    if (selectedLangs.includes(lang)) {
      setSelectedLangs(selectedLangs.filter((l) => l !== lang))
    } else {
      setSelectedLangs([...selectedLangs, lang])
    }
  }

  const handleSubmit = async (data: SbpFormData) => {
    const { pageId } = await getPageId()
    const subData = { ...data, langs: selectedLangs, page: pageId }
    setFormData(subData)

    await addUser({ data: subData })
    setIsSubmited(true)
  }

  return (
    <div className="flex h-dvh flex-col justify-between bg-cream font-circe">
      <div className="grid h-full grid-cols-2 px-[6.66vh] pt-[6.66vh]">
        <div className="flex flex-col justify-between">
          <img src={SbpLogo} alt="SBP Logo" className="w-[32vh]" />

          <div className="mb-4 text-[6.66vh] leading-none">
            <p>Новый стандарт</p>
            <p>быстрых платежей</p>
          </div>
        </div>

        <div className="flex h-full justify-center">
          <Card className="w-8/12">
            <CardContent>
              {!isSubmited ? (
                <SbpForm
                  langs={langData}
                  handleSelect={handleSelect}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <Suspense
                  fallback={<Skeleton className="aspect-video w-full" />}
                >
                  <ImageGen data={formData} />
                </Suspense>
                // <QrCode data={formData} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <SbpColorLine />
    </div>
  )
}
