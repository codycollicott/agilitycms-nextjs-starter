import Link from "next/link"
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"
/**
 * This footer is not part of the content in the CMS, feel free to remove this for production use.
 */

const SiteFooter = ({ footer, header }) => {
	return (
		<footer className="px-8 py-8 mt-12 md:mt-28">
      <div className="bg-black h-[1px] w-full my-4"></div>
			<img src={header?.logo?.url} />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-12">
        <div className="flex md:block flex-wrap gap-2">
          {footer?.links?.[0]?.map(link => (
            <Link href={link?.fields?.linkUrl || ''}>
              <p className="mb-2">{link?.fields?.linkName}</p>
            </Link>
          ))}
        </div>
        <div className="flex md:block flex-wrap gap-2">
          {footer?.links?.[1]?.map(link => (
            <Link href={link?.fields?.linkUrl || ''}>
              <p className="mb-2">{link?.fields?.linkName}</p>
            </Link>
          ))}
        </div>
        <div className="flex md:block flex-wrap gap-2">
          <Link href={footer?.data?.downloadbutton1URL || ''}>
            <div className="flex mb-2 items-center">
              <p className="mr-2">{footer?.data?.downloadButtonLabel1}</p>
              <ArrowDownTrayIcon className="w-4" />
            </div>
          </Link>
          <Link href={footer?.data?.downloadbutton2URL || ''}>
            <div className="flex mb-2 items-center">
              <p className="mr-2">{footer?.data?.downloadButtonLabel2}</p>
              <ArrowDownTrayIcon className="w-4" />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-start flex-wrap gap-4 xl:justify-end mt-8 md:mt-12">
        <Link href={footer?.data?.link1?.href}>
          <div className="border flex rounded-sm px-6 py-2 items-center">  {footer?.data?.link1?.text} </div>
        </Link>
        <a href={`mailto:${footer?.data?.link2?.href}`}>
          <div className="border flex rounded-sm px-6 py-2 items-center"> <img className="w-4 mr-2" src='/env.svg' /> {footer?.data?.link2?.text} </div>
        </a>
        
        <button className="p-[2px] rounded-lg bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500">
          <span className="block bg-white text-black px-4 py-2 rounded-md">
            <Link href={footer?.data?.link3?.href}>
              <div className="flex">
                <img className="w-4 mr-2" src='/ai_icon.svg' /> {footer?.data?.link3?.text}
              </div>
            </Link>
          </span>
        </button>
      </div>
      <div className="bg-black h-[1px] w-full my-4"></div>
      <div className="flex flex-wrap justify-start md:flex-row gap-2  mt-4">
        {footer?.links?.[2]?.map(link => (
          <Link href={link?.fields?.linkUrl || ''}>
            <p className="text-gray-600 text-sm mb-2">{link?.fields?.linkName}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-col xl:flex-row items-start xl:justify-between xl:items-center">
        <p className="text-gray-600 mt-4 text-sm"> {footer?.data?.copyrightText} </p>
        <div className="flex items-center">
          {footer?.data?.linkedinURL && (
            <Link target="_blank" href={footer?.data?.linkedinURL || ''}> <img className="w-4 mr-4" src='/link.svg' /></Link>
          )}
          {footer?.data?.youtubeUrl && (
            <Link target="_blank" href={footer?.data?.youtubeUrl || ''}> <img className="w-4 mr-4" src='/youtube.svg' /></Link>
          )}
          {footer?.data?.instagramURL && (
            <Link target="_blank" href={footer?.data?.instagramURL || ''}> <img className="w-4" src='/insta.svg' /></Link>
          )}
        </div>
      </div>
		</footer>
	)
}

export default SiteFooter
