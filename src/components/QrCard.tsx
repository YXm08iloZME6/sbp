import type { SbpFormData } from "@/lib/types"
import { CardContent } from "./ui/card"
import { ReactQRCode, type GradientSettings } from "@lglab/react-qr-code"
import SbpLogoSmall from "@/assets/sbpLogoSmall.svg"

const gradients: GradientSettings[] = [
  {
    type: "linear",
    rotation: 45,
    stops: [
      { offset: "0%", color: "rgb(6, 152, 214)" },
      { offset: "50%", color: "rgb(0, 133, 63)" },
      { offset: "100%", color: "rgb(120, 183, 42)" },
    ],
  },
  {
    type: "linear",
    rotation: 135,
    stops: [
      { offset: "0%", color: "rgb(249, 180, 41)" },
      { offset: "33%", color: "rgb(239, 128, 25)" },
      { offset: "66%", color: "rgb(228, 6, 70)" },
      { offset: "100%", color: "rgb(143, 71, 148)" },
    ],
  },
  {
    type: "radial",
    stops: [
      { offset: "0%", color: "rgb(6, 152, 214)" },
      { offset: "100%", color: "rgb(91, 87, 162)" },
    ],
  },
]

export default function QrCode({ data }: { data: SbpFormData }) {
  return (
    <>
      <CardContent className="flex flex-col items-center justify-center">
        <ReactQRCode
          value={`${window.location.origin}/user/${data.page}`}
          gradient={gradients[1]}
          imageSettings={{
            src: SbpLogoSmall,
            width: 60,
            height: 60,
            excavate: true,
          }}
          size={420}
          finderPatternOuterSettings={{ style: "inpoint" }}
        />
        <div className="w-full text-center">
          <p className="text-3xl font-medium text-[#1A1A1A] 3xl:text-5xl">
            {data.name}
          </p>
          <div>
            <p className="mt-4 text-xl font-bold tracking-wider text-black uppercase opacity-60 3xl:mt-8 3xl:text-2xl">
              GitHub
            </p>
            <p className="mt-1 text-2xl font-medium break-all text-[#1A1A1A]">
              @{data.github}
            </p>
          </div>

          <div className="mt-4 3xl:mt-12">
            <p className="texlt-xl mb-2 font-bold tracking-wider text-black uppercase opacity-60 3xl:text-2xl">
              Любимые языки
            </p>
            <div className="mt-4 mb-4 flex flex-wrap justify-center gap-4">
              {data.langs.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-black/10 bg-white px-3 py-1 text-lg font-medium text-black shadow-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )
}
