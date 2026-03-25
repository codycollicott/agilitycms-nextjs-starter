"use client"
import { useState} from "react"
import Link from "next/link"
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid"
import { XCircleIcon } from "@heroicons/react/24/outline"
import { usePathname } from "next/navigation"

const MobileMenu = ({ header, state, setHeaderState }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [subMenu, setSubMenu] = useState(null)

  const [hash, setHash] = useState("");

  if (!header) {
    return (
      <header className="relative p-8 text-center">
        <p className="text-gray-400 font-bold">No Header Available</p>
      </header>
    )
  }
  
  return (
    <header className={`${state ? 'block' : 'hidden'} fixed bg-black h-full p-8 z-20 left-0 top-0 w-full`}>
      <div className="">
        <div className="flex justify-end">
          <div onClick={() => setHeaderState(false)} className="cursor-pointer border pl-2 pr-1 py-1 border-white rounded-full items-center flex gap-4">
            <p className="text-white"> Close </p>
            <XCircleIcon className="text-white w-8"></XCircleIcon>
          </div>
        </div>
        <div className="flex-col">
          <nav className="flex-col">
            {header.map((navitem, index) => {
              const isParentActive = pathname === navitem.path || pathname.startsWith(navitem.path + "/");
              if (navitem?.children) {
                return (
                  <div className="">
                    <div className="">
                      <div onClick={() => {subMenu == index ? setSubMenu(null) : setSubMenu(index)}} className={`${isParentActive && 'bg-[#333]'} cursor-pointer p-2 flex justify-between items-center`}>
                        <p className={`text-base leading-6 font-medium text-white`}> {navitem.title} </p>
                        {subMenu == index ? <ArrowUpIcon className="w-4 text-white" /> : <ArrowDownIcon className="w-4 text-white" />}
											 </div>
                    </div>
                    {subMenu == index && (
                      <div className="ml-4 mt-2 flex flex-col"> 
                        {navitem?.children?.map((item) => {
                          const isChildActive = (`${pathname}${hash ? '#'+hash : ''}`).includes(`${navitem?.children?.[0]?.path}${item?.redirect?.url}`)
                          return (
                            <Link
                              href={`${navitem?.children?.[0]?.path}${item?.redirect?.url || ''}`}
                              key={`mobile-${index}`}
                              onClick={() => {
                                setHeaderState(false)
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
              }
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default MobileMenu
