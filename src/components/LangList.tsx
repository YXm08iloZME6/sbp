import { Toggle } from "@/components/ui/toggle"
import { motion } from "motion/react"

interface LangListProps {
  langs: string[]
  handleToggle: (lang: string) => void
}

export default function LangList({ langs, handleToggle }: LangListProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 2xl:gap-4 2xl:px-8">
      {langs.map((lang) => {
        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 5 }}
            key={lang}
          >
            <Toggle
              variant="outline"
              aria-label={lang}
              onPressedChange={() => handleToggle(lang)}
              size="lg"
              className="cursor-pointer 2xl:h-15 2xl:text-2xl"
            >
              {lang}
            </Toggle>
          </motion.div>
        )
      })}
    </div>
  )
}
