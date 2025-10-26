import type { Metadata } from "next";
import "../styles/globals.scss";
import { AppToaster } from "@/utils/toaster";

export const metadata: Metadata = {
  title: "Explora Trip",
  description: "Organize seus roteiros, gerencie gastos e compartilhe experiências com seus amigos.",
  icons: {
    icon: "/assets/logo_exploraTrip.png", // ou "/icons/favicon-32x32.png"
  },
}; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="pt-br">
      <body>
        {children}
        <AppToaster/>
      </body>
    </html>
  );
}