"use client"
import { useState, useEffect} from "react"
import Link from "next/link"
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid"
import { usePathname } from "next/navigation"


const SiteHeader = ({ header }) => {
	const pathname = usePathname()
	const [subMenu, setSubMenu] = useState(null)
  const [isScrolledLive, setIsScrolledLive] = useState(false)
  const [hash, setHash] = useState("");

  if (!header) {
		return (
			<header className="relative p-8 text-center">
				<p className="text-gray-400 font-bold">No Header Available</p>
			</header>
		)
	}
  
  
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 50;
      if (window.scrollY > threshold && !isScrolledLive) {
        setIsScrolledLive(true);
      } else if (window.scrollY <= 10 && isScrolledLive) {
        setIsScrolledLive(false);
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolledLive])

	return (
		<header className={`hidden md:block w-1/5 bg-primary py-4 sticky top-0 h-screen ${isScrolledLive ? 'top-[64px]' : ''} overflow-y-scroll`}>
			<div className="max-w-(--breakpoint-xl) mx-auto">
				<div className="flex-col">
					<nav className="flex-col">
						{header.links.map((navitem, index) => {
              const isParentActive = pathname === navitem.path || pathname.startsWith(navitem.path + "/");
              
							if (navitem?.children) {
								return (
									<div className="">
										<div className="">
                      <div onClick={() => {subMenu == index ? setSubMenu(null) : setSubMenu(index)}} className={`${isParentActive && 'bg-[#333]'} cursor-pointer px-4 py-2 flex justify-between items-center`}>
                        <p className={`text-base leading-6 font-medium text-white`}> {navitem.title} </p>
                        {subMenu == index ? <img src='/arrow-down.svg' className="w-4 text-white" /> : <img src='/arrow-up.svg' className="w-4 text-white" />}
											 </div>
										</div>
										{subMenu == index && (
											<div className="ml-4 mt-2 flex flex-col"> 
												{navitem?.children?.map((item, index) => {
                          const url = item?.redirect?.url || '';
                          const [itemPathPart, itemHashPart] = url.split('#');

                          const itemPath = `${navitem?.children?.[0]?.path}${itemPathPart}`;
                          const itemHash = itemHashPart || '';

                          const currentPath = pathname;
                          const currentHash = hash || '';

                          const isChildActive =
                            currentPath === itemPath &&
                            (itemHash ? currentHash === itemHash : !currentHash);

                          const isDefaultChild =
                            !currentHash &&
                            index === 0 &&
                            currentPath === navitem?.children?.[0]?.path;

                          return (
                            <Link
                              href={itemPath + (itemHash ? `#${itemHash}` : '')}
                              key={`mobile-${index}`}
                              onClick={() => {
                                setHash(itemHash || '');
                              }}
                              className={`${
                                (isChildActive || isDefaultChild)
                                  ? 'bg-[#333] text-[#FFF]'
                                  : 'text-[#CCC]'
                              } p-2 text-base relative`}
                            >
                              {(isChildActive || isDefaultChild) && (
                                <div className="absolute h-full bg-[#333] top-0 -left-[100%] w-full"></div>
                              )}
                              {item.title || item?.menuText}
                            </Link>
                          );
                        })}
											</div>
										)} 
									</div>
								)
							}
						})}
					</nav>
				</div>
			</div>
		</header>
	)
}

export default SiteHeader
