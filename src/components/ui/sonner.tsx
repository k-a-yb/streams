import { useEffect, useState } from "react"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

// Custom hook to get theme from <html> class (e.g., "dark" or "light")
function useHtmlTheme(defaultTheme: string = "system") {
  const [theme, setTheme] = useState<string>(defaultTheme)

  useEffect(() => {
    const html = document.documentElement
    const classTheme =
      html.classList.contains("dark")
        ? "dark"
        : html.classList.contains("light")
        ? "light"
        : defaultTheme
    setTheme(classTheme)
  }, [])

  return { theme }
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useHtmlTheme("system")

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }