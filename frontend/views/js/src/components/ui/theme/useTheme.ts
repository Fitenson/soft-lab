import { useContext } from "react";
import { ThemeProviderContext } from "@/components/ui/theme/ThemeProvider";


export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
