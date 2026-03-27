import { draftMode } from "next/headers"
import PreviewBar from "components/common/PreviewBar"
import SiteFooter from "components/common/SiteFooter"
import SiteHeader from "components/common/SiteHeader"
import { getAgilityContext } from "lib/cms/getAgilityContext"

import TopHeader from "components/common/TopHeader"
import "../styles/globals.css"
import { getHeaderContent } from "lib/cms-content/getHeaderContent"
import { getFooterContent } from "lib/cms-content/getFooterContent"
import { redirect } from "next/navigation"
import Script from "next/script"


export default async function RootLayout({
  children,
}) {
  const { locale, sitemap, isDevelopmentMode, isPreview } = await getAgilityContext()
  const header = await getHeaderContent({ sitemap, locale })
  const footer = await getFooterContent({locale})

  async function startPreviewMode(pathname) {
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
      <div className="xl:h-full md:grid-cols-4 md:grid-cols-5 md:grid-cols-3 md:grid-cols-2 grid-cols-2 grid-cols-1 text-sm hidden xl:grid-cols-3"></div>
      <body data-agility-guid={process.env.AGILITY_GUID} className="bg-white">
        <div id="site-wrapper">
          <div id="site" className="w-full 2xl:w-[1440px] xl:w-[1280px] mx-auto px-0 xl:px-8">
            <PreviewBar
              {...{ isDevelopmentMode, isPreview, startPreviewMode }}
            />
            <TopHeader {...{ header }} />
            <div className="flex flex-col min-h-screen">
              <div className="flex">
                <SiteHeader {...{ header }} />
                <main className='w-full md:w-3/4'>
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
