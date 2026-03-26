import { useForm } from "@tanstack/react-form"
import LangList from "@/components/LangList"
import type { SbpFormData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Separator } from "./ui/separator"
import { motion } from "motion/react"

interface SpbFormProps {
  langs: string[]
  handleSelect: (lang: string) => void
  handleSubmit: (data: SbpFormData) => void
}

export default function SpbForm({
  langs,
  handleSelect,
  handleSubmit,
}: SpbFormProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      github: "",
      email: "",
      exp: 0,
      langs: [],
      sendEmail: false,
    },
    onSubmit: ({ value }) => {
      handleSubmit({ ...value })
      form.reset()
    },
  })

  return (
    <>
      <CardContent>
        <Field>
          <FieldLabel className="3xl:text-2xl" htmlFor="langs">
            Любимые языки
          </FieldLabel>
          <LangList langs={langs} handleToggle={handleSelect} />
        </Field>
        <Separator className="my-2 2xl:my-8" />
        <form
          id="sbp-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <div className="flex flex-col gap-4 3xl:gap-6">
              <form.Field
                name="name"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel className="3xl:text-2xl" htmlFor={field.name}>
                        Имя
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="John Doe"
                        autoComplete="off"
                        className="bg-cream 3xl:h-15"
                        // style={{ fontSize: "24px" }}
                      />
                    </Field>
                  )
                }}
              />
              <form.Field
                name="github"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel className="3xl:text-2xl" htmlFor={field.name}>
                        GitHub @
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="johndoe"
                        autoComplete="off"
                        className="bg-cream 3xl:h-15"
                        // style={{ fontSize: "24px" }}
                      />
                    </Field>
                  )
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel className="3xl:text-2xl" htmlFor={field.name}>
                        Почта
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="johndoe@gmail.com"
                        autoComplete="off"
                        className="bg-cream 3xl:h-15"
                        // style={{ fontSize: "24px" }}
                      />
                    </Field>
                  )
                }}
              />
              <form.Field
                name="sendEmail"
                children={(field) => {
                  return (
                    <Field orientation="horizontal">
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(checked === true)
                        }
                        className="3xl:h-8 3xl:w-8"
                      />
                      <FieldLabel className="3xl:text-lg" htmlFor={field.name}>
                        Отправить мне на почту
                      </FieldLabel>
                    </Field>
                  )
                }}
              />
            </div>
            <form.Field
              name="exp"
              children={(field) => {
                return (
                  <Field>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <FieldLabel className="3xl:text-2xl" htmlFor={field.name}>
                        Опыт
                      </FieldLabel>
                      <span className="text-muted-foreground 3xl:text-2xl">
                        {field.state.value}
                      </span>
                    </div>
                    <Slider
                      defaultValue={field.state.value}
                      min={0}
                      max={20}
                      step={1}
                      onValueChange={(value) =>
                        field.handleChange(
                          Array.isArray(value) ? value[0] : value
                        )
                      }
                    />
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="mt-4 bg-card 3xl:mt-8">
        <Field orientation="horizontal" className="mt-2 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
            }}
          >
            <Button
              type="submit"
              form="sbp-form"
              variant="outline"
              className="rounded-2xl bg-cream text-foreground uppercase 3xl:h-16 3xl:text-2xl"
            >
              Отправить
            </Button>
          </motion.div>
        </Field>
      </CardFooter>
    </>
  )
}
