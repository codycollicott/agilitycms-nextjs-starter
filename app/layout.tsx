import { draftMode } from "next/headers"
import PreviewBar from "components/common/PreviewBar"
import SiteFooter from "components/common/SiteFooter"
import SiteHeader from "components/common/SiteHeader"
import { getAgilityContext } from "lib/cms/getAgilityContext"

import { Inter } from "next/font/google"
import TopHeader from "components/common/TopHeader"
import "../styles/globals.css"
import { getHeaderContent } from "lib/cms-content/getHeaderContent"
import { getFooterContent } from "lib/cms-content/getFooterContent"
import { redirect } from "next/navigation"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { locale, sitemap, isDevelopmentMode, isPreview } = await getAgilityContext()
  const header = await getHeaderContent({ sitemap, locale })
  const footer = await getFooterContent({locale})

  async function startPreviewMode(pathname: string) {
    "use server";

    //turn on draft/preview mode
    (await draftMode()).enable()

    // Redirect to the same page
    let url = `${pathname}`
    if (url.includes("?")) {
      url = `${url}&preview=1`
    } else {
      url = `${url}?preview=1`
    }

    redirect(url)
  }
  
  return (
    <html lang="en" className={`bg-white`}>
      <body data-agility-guid={process.env.AGILITY_GUID} className="bg-white">
        <div id="site-wrapper">
          <div id="site" className="container mx-auto">
            <PreviewBar
              {...{ isDevelopmentMode, isPreview, startPreviewMode }}
            />
            <TopHeader {...{ header }} />
            <div className="flex flex-col min-h-screen">
              <div className="flex">
                <SiteHeader {...{ header }} />
                <main className='w-3/4'>
                  <div className="">
                    {children}
                  </div>
                  <SiteFooter {...{ footer }} {...{header}} />
                </main>
              </div>
              
            </div>
          </div>
        </div>
      </body>
      <Script src="https://unpkg.com/@agility/web-studio-sdk@latest/dist/index.js" />
    </html>
  )
}
