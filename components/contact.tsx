"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { PersonalInfoQueryResult } from "@/types/sanity"
import { submitContactForm } from "@/lib/queries"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface ContactProps {
  personalInfo: PersonalInfoQueryResult
}

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function Contact({ personalInfo }: ContactProps) {
  const { toast } = useToast()
  const { handleSubmit, control, reset, formState } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  if (!personalInfo) {
    return (
      <section id="contact" className="py-16 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6 flex items-center justify-center">
          <p>Loading contact information...</p>
        </div>
      </section>
    )
  }

  const onSubmit = async (data: ContactFormData) => {
    const response = await submitContactForm({ data })

    if (response?.success) {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
    }

    if (response && !response.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error sending your message.",
      })
    }

    reset()
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/40">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Have a project in mind or want to discuss potential opportunities?
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Here are the ways you can reach me directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">
                      {personalInfo.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">
                      {personalInfo.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="name"
                          required
                          placeholder="Your name"
                        />
                      )}
                    />
                    {formState.errors.name && (
                      <p className="text-red-500">
                        {formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          required
                          placeholder="Your email address"
                        />
                      )}
                    />
                    {formState.errors.email && (
                      <p className="text-red-500">
                        {formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Controller
                      name="subject"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="subject"
                          required
                          placeholder="Subject of your message"
                        />
                      )}
                    />
                    {formState.errors.subject && (
                      <p className="text-red-500">
                        {formState.errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Controller
                      name="message"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          id="message"
                          required
                          placeholder="Your message"
                          className="min-h-[120px]"
                        />
                      )}
                    />
                    {formState.errors.message && (
                      <p className="text-red-500">
                        {formState.errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={formState.isSubmitting}
                  >
                    {formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
