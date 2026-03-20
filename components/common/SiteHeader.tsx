"use client"
import { useState} from "react"
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
  
  
  if (!header) {
		return (
			<header className="relative p-8 text-center">
				<p className="text-gray-400 font-bold">No Header Available</p>
			</header>
		)
	}
  
	return (
		<header className="w-1/4 bg-primary relative mx-auto p-8">
			<div className="max-w-(--breakpoint-xl) mx-auto">
				<div className="flex-col">
					
					<div className="flex items-center space-x-4">
						
						<div className="-mr-2 -my-2 md:hidden">
							<button
								onClick={() => setOpen(!open)}
								aria-label="Toggle Menu"
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
							>
								{/* <!-- Heroicon name: menu --> */}
								<CgArrowDown className="w-4" />

							</button>
						</div>
					</div>
					<nav className="flex-col">
						{header.links.map((navitem, index) => {
              const isParentActive = pathname.includes(navitem.path)
              console.log(navitem)
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
                          const isChildActive = pathname.includes(item.path)
                          return (
                            <Link
                              href={item?.redirect?.url ? `${navitem?.children?.[0]?.path}${item?.redirect?.url}` : item.path}
                              key={`mobile-${index}`}
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
