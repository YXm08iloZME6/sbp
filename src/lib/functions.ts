import { db } from "@/lib/db"
import { createServerFn } from "@tanstack/react-start"
import { queryOptions } from "@tanstack/react-query"
import { users, userInsertSchema } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { Resend } from "resend"
import * as z from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const getUser = createServerFn({ method: "GET" })
  .inputValidator(z.string())
  .handler(async ({ data }) => {
    const user = await db.select().from(users).where(eq(users.page, data))
    return user[0]
  })

const sendEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string(),
      subject: z.string(),
      message: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const { error } = await resend.emails.send({
      from: "SBP <onboarding@mail.sbptest.ru>",
      to: [data.email],
      subject: data.subject,
      text: data.message,
    })

    if (error) {
      throw new Error("Failed to send email")
    }

    return { success: true }
  })

export const addUser = createServerFn({ method: "POST" })
  .inputValidator(userInsertSchema)
  .handler(async ({ data }) => {
    await db.insert(users).values(data)
    if (data.sendEmail && data.email) {
      await sendEmail({
        data: {
          email: data.email,
          subject: "Сообщение от СБП",
          message: "Сообщение от СБП",
        },
      })
    }
  })

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["user", id],
    queryFn: () => getUser({ data: id }),
  })

export const getPageId = createServerFn({ method: "POST" }).handler(
  async () => {
    const pageId = nanoid(6)
    return { pageId }
  }
)

export const generateImage = createServerFn({ method: "GET" })
  .inputValidator(userInsertSchema)
  .handler(async ({ data }) => {
    const formData = new FormData()
    formData.append(
      "prompt",
      `A chaotic, square-format photograph of a frazzled software developer named ${data.name}. He is wearing a handmade t-shirt with messy, marker-written text that reads: "I have ${data.exp} years of experience and I still spend 90% of my time Googling syntaxes for ${data.langs.join()}." He is frantically typing on a keyboard while a pet cat is sitting on his head. On his desk, in front of five cluttered monitors displaying scrolling errors, is a small, glowing neon sign shaped like a radioactive octocat that reads: "@${data.github}". The desk is buried under a mountain of empty energy drink cans and sticky notes. He looks both terrified and triumphant. Wide-angle lens, exaggerated comedic realism, warm, messy, office lighting.`
    )
    formData.append("model", "stabilityai/sdxl-turbo")
    formData.append("quality", "auto")
    formData.append("size", "auto")

    const response = await fetch(
      "https://api.imagerouter.io/v1/openai/images/edits",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.IMAGEROUTER_API_KEY}`,
        },
        body: formData,
      }
    )

    const imageData = await response.json()
    return imageData.data[0].url
  })
