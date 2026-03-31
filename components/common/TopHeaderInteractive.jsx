"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {Search} from "./Search"
import { Bars4Icon } from '@heroicons/react/24/solid'
import {MagnifyingGlassCircleIcon, XCircleIcon} from '@heroicons/react/24/solid'
import MobileMenu from './MobileMenu'


const TopHeaderInteractive = ({ links, logo }) => {
  
  const [headerState, setHeaderState] = useState(false)
  const [searchState, setSearchState] = useState(false)
  const [isScrolledLive, setIsScrolledLive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Increase threshold to 50px so the layout shift 
      // doesn't accidentally pull the scroll back under the trigger point
      const threshold = 50;
      if (window.scrollY > threshold && !isScrolledLive) {
        setIsScrolledLive(true);
      } else if (window.scrollY <= 10 && isScrolledLive) {
        // Use a lower number to reset so there's a "buffer" zone (Hysteresis)
        setIsScrolledLive(false);
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolledLive]) // Add dependency to track state correctly

  console.log(isScrolledLive)
	return (
    <div className={`sticky top-0 z-20 bg-white transition-all duration-300 ease-in-out`}>
      <div className={`flex items-center justify-between py-2 transition-all duration-300 ${isScrolledLive ? 'md:py-2' : 'md:py-8'} px-2 xl:px-2`}>
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
