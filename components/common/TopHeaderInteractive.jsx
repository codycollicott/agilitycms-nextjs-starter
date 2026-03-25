"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {Search} from "./Search"
import { Bars4Icon } from '@heroicons/react/24/solid'
import {MagnifyingGlassCircleIcon, XCircleIcon} from '@heroicons/react/24/solid'
import MobileMenu from './MobileMenu'


const TopHeaderInteractive = ({ links, logo }) => {
  console.log(links)
  const [headerState, setHeaderState] = useState(false)
  const [searchState, setSearchState] = useState(false)
	
	return (
    <div>
      <div className="flex items-center justify-between py-2 md:py-8 px-2">
        <Link href="/" className="flex items-center">
          <img
            src={logo?.url}
            alt={logo?.label}
          />
        </Link>
        <div className="hidden md:block">
          <Search />
        </div>
        <div className="block md:hidden">
          <div className="flex gap-4">
            <Bars4Icon onClick={() => setHeaderState(true)} className="w-8" />
            <MobileMenu className="w-8" setHeaderState={setHeaderState} state={headerState} header={links} />
            {searchState ? (
              <XCircleIcon className="w-8" onClick={() => setSearchState(false)} />
            ) : (
              <MagnifyingGlassCircleIcon className="w-8" onClick={() => setSearchState(true)} />
            )}
            
          </div>
        </div>
			</div>
      {searchState && (
        <div className="block md:hidden px-2 pb-4">
          <Search />
        </div>
      )}
		</div>
	)
}

export default TopHeaderInteractive
