"use client"
import { useState, useEffect} from "react"
import Link from "next/link"
import { IHeaderData } from "lib/cms-content/getHeaderContent"
import { CgArrowDown, CgArrowUp } from "react-icons/cg"
import { usePathname } from "next/navigation"

interface Props {
	header: IHeaderData | null
}

const SiteHeader = ({ header }: Props) => {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)
	const [subMenu, setSubMenu]:any = useState(null)

  const [hash, setHash] = useState("");

  if (!header) {
		return (
			<header className="relative p-8 text-center">
				<p className="text-gray-400 font-bold">No Header Available</p>
			</header>
		)
	}
  
	return (
		<header className="w-1/4 bg-primary p-8 sticky top-0 h-screen overflow-y-scroll">
			<div className="max-w-(--breakpoint-xl) mx-auto">
				<div className="flex-col">
					<nav className="flex-col">
						{header.links.map((navitem:any, index) => {
              const isParentActive = pathname === navitem.path || pathname.startsWith(navitem.path + "/");
							if (navitem?.children) {
								return (
									<div className="">
										<div className="">
                      <div className={`${isParentActive && 'bg-[#333]'} p-2 flex justify-between items-center`}>
                        <p className={`text-base leading-6 font-medium text-white`}> {navitem.title} </p>
                        {subMenu == index ? <CgArrowUp className="text-white" onClick={() => setSubMenu(null)} /> : <CgArrowDown className="text-white" onClick={() => setSubMenu(index)} />}
											 </div>
										</div>
										{subMenu == index && (
											<div className="ml-4 mt-2 flex flex-col"> 
												{navitem?.children?.map((item:any) => {
                          const isChildActive = (`${pathname}${hash ? '#'+hash : ''}`).includes(`${navitem?.children?.[0]?.path}${item?.redirect?.url}`)
                          return (
                            <Link
                              href={`${navitem?.children?.[0]?.path}${item?.redirect?.url || ''}`}
                              key={`mobile-${index}`}
                              onClick={() => {
                                const url = item?.redirect?.url || "";
                                const hash = url.split("#")[1];
                                if (hash) setHash(hash);
                              }}
                              className={`${(isChildActive && isParentActive) ? 'bg-[#333] text-[#FFF]' : 'text-[#CCC]'} p-2 text-base`}
                            >
                              {item.title || item?.menuText}
                            </Link>
												)})}
											</div>
										)} 
									</div>
								)
							}else {
                return (
                  <Link
                    href={navitem.path}
                    key={`mobile-${index}`}
                    className="text-base leading-6 font-medium text-white"
                  >
                    {navitem.title}
                  </Link>
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
