import Image from "next/image"
import React from "react"
import { CgSoftwareDownload } from "react-icons/cg"
/**
 * This footer is not part of the content in the CMS, feel free to remove this for production use.
 */

const SiteFooter = ({ header }) => {

	return (
		<footer className="px-8 py-8 mt-28">
      <div className="bg-black h-[1px] w-full my-4"></div>
			<img src={header?.logo?.url} />
      <div className="mt-12 grid grid-cols-3 gap-12">
        <div>
          <p className="mb-2">Brand architecture</p>
          <p className="mb-2">Strategy and writing</p>
          <p className="mb-2">Logo</p>
          <p className="mb-2">Layout system</p>
          <p className="mb-2">Colour palette</p>
          <p className="">Typography</p>
        </div>
        <div>
          <p className="mb-2">Photography</p>
          <p className="mb-2">Video and motion standards</p>
          <p className="mb-2">Icons</p>
          <p className="mb-2">QA Checklist</p>
          <p className="mb-2">Applications and templates</p>
        </div>
        <div>
          <div className="flex mb-2 items-center">
            <p className="mr-2">Download Oxford logo</p>
            <CgSoftwareDownload />
          </div>
          <div className="flex mb-2 items-center">
            <p className="mr-2">Download font package</p>
            <CgSoftwareDownload />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-12">
        <div className="border rounded-sm px-6 mr-2 py-2"> Oxford Digital Library </div>
        <div className="border rounded-sm px-6 mr-2 py-2"> Brand Marketing </div>
        <div className="border rounded-sm px-6 py-2"> AI Assistant </div>
      </div>
      <div className="bg-black h-[1px] w-full my-4"></div>
      <div className="flex gap-4 justify-between mt-4">
        <p className="text-sm text-gray-600"> Privacy </p>
        <p className="text-sm text-gray-600"> Privacy </p>
        <p className="text-sm text-gray-600"> Privacy </p>
        <p className="text-sm text-gray-600"> Privacy </p>
      </div>
      <p className="text-gray-600 mt-4 text-sm"> © Oxford Properties Group 2025. All rights reserved. All figures as of June 30, 2025 unless otherwise stated. </p>
		</footer>
	)
}

export default SiteFooter
