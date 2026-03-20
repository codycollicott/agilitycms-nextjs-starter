"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { IHeaderData } from "lib/cms-content/getHeaderContent"
import { AgilityImage } from "@agility/nextjs"
import {Search} from "../common/Search"
interface Props {
    header: IHeaderData | null
}

const TopHeader = ({ header }: Props) => {
  console.log(header)
	if (!header) {
		return (
			<header className="relative p-8 text-center">
				<p className="text-gray-400 font-bold">No Header Available</p>
			</header>
		)
	}
	return (
		<div className="flex justify-between py-8">
			<Link href="/" className="flex items-center">
				<img
					src={header?.logo?.url}
					alt={header?.logo?.label}
				/>
			</Link>
			<Search />
				
		</div>
	)
}

export default TopHeader
