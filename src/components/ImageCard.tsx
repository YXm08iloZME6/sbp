import type { SbpFormData } from "@/lib/types"
import { CardContent } from "./ui/card"
import { generateImage } from "@/lib/functions"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function ImageGen({ data }: { data: SbpFormData }) {
  const { data: imageUrl } = useSuspenseQuery({
    queryKey: ["generateImage", data],
    queryFn: () => generateImage({ data }),
  })
  return (
    <>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            src={imageUrl}
            alt={data.name}
            className="w-full max-w-75 rounded-lg"
          />
        </div>

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
