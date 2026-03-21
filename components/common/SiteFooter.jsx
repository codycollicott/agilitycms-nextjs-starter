import Image from "next/image"
import Link from "next/link"
import React from "react"
import { CgSoftwareDownload } from "react-icons/cg"
/**
 * This footer is not part of the content in the CMS, feel free to remove this for production use.
 */

const SiteFooter = ({ footer, header }) => {
  console.log('asdkjl;asd')
  console.log(footer)
	return (
		<footer className="px-8 py-8 mt-28">
      <div className="bg-black h-[1px] w-full my-4"></div>
			<img src={header?.logo?.url} />
      <div className="mt-12 grid grid-cols-3 gap-12">
        <div>
          {footer?.links?.[0]?.map(link => (
            <Link href={link?.fields?.linkUrl || ''}>
              <p className="mb-2">{link?.fields?.linkName}</p>
            </Link>
          ))}
        </div>
        <div>
          {footer?.links?.[1]?.map(link => (
            <Link href={link?.fields?.linkUrl || ''}>
              <p className="mb-2">{link?.fields?.linkName}</p>
            </Link>
          ))}
        </div>
        <div>
          <div className="flex mb-2 items-center">
            <p className="mr-2">{footer?.data?.downloadButtonLabel1}</p>
            <CgSoftwareDownload />
          </div>
          <div className="flex mb-2 items-center">
            <p className="mr-2">{footer?.data?.downloadButtonLabel2}</p>
            <CgSoftwareDownload />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-12">
        <Link href={footer?.data?.link1?.href}>
          <div className="border flex rounded-sm px-6 py-2 items-center mr-2">  {footer?.data?.link1?.text} </div>
        </Link>
        <Link href={footer?.data?.link2?.href}>
          <div className="border flex rounded-sm px-6 py-2 items-center mr-2"> <img className="w-4 mr-2" src='/env.svg' /> {footer?.data?.link2?.text} </div>
        </Link>
        <Link href={footer?.data?.link3?.href}>
          <div className="border flex rounded-sm px-6 py-2 items-center"> <img className="w-4 mr-2" src='/ai_icon.svg' /> {footer?.data?.link3?.text} </div>
        </Link>
      </div>
      <div className="bg-black h-[1px] w-full my-4"></div>
      <div className="flex gap-4 justify-between mt-4">
        {footer?.links?.[2]?.map(link => (
          <Link href={link?.fields?.linkUrl || ''}>
            <p className="text-gray-600 text-sm mb-2">{link?.fields?.linkName}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600 mt-4 text-sm"> {footer?.data?.copyrightText} </p>
        <div className="flex items-center">
          <Link href={footer?.data?.linkedinUrl || ''}> <img className="w-4 mr-4" src='/link.svg' /></Link>
          <Link href={footer?.data?.youtubeUrl || ''}> <img className="w-4 mr-4" src='/youtube.svg' /></Link>
          <Link href={footer?.data?.instagramUrl || ''}> <img className="w-4" src='/insta.svg' /></Link>
        </div>
      </div>
		</footer>
	)
}

export default SiteFooter
