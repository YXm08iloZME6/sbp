import { motion } from "motion/react"

export default function SbpColorLine() {
  const bars = [
    { flex: 0.5, color: "bg-blue" },
    { flex: 1, color: "bg-green" },
    { flex: 1.5, color: "bg-lime" },
    { flex: 2, color: "bg-yellow" },
    { flex: 2, color: "bg-orange" },
    { flex: 1.5, color: "bg-pink" },
    { flex: 1, color: "bg-purple" },
    { flex: 0.5, color: "bg-violet" },
  ]

  return (
    <div className="w-full">
      <div className="my-[6.66vh] flex h-[6.66vh] w-full overflow-hidden">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className={`${bar.color} h-full`}
            initial={{ flex: bar.flex }}
            animate={{
              flex: [bar.flex, bar.flex * 1.5, bar.flex * 0.7, bar.flex],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
    </div>
  )
}
