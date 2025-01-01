import 'boxicons/css/boxicons.min.css';
import {
    ChevronDownIcon,
  } from '@heroicons/react/20/solid'
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
  
  export default function Example() {
    return (
      <div className="lg:flex lg:items-center lg:justify-between py-4 px-10 bg-landing-page-bg">
        <div className="min-w-0 flex-1 flex items-center">
          <i className='bx bxl-whatsapp text-[2.5rem] text-[#25D366]'></i>
          <h2 className="text-2xl/7 font-[600] text-[#25D366] sm:truncate sm:text-[1.35rem] sm:tracking-tight">
            WhatsApp
          </h2>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">

        <span className="sm:ml-3 flex flex-col items-center group relative">
          <button
            type="button"
            className="inline-flex transition-colors duration-1000 overflow-hidden items-center bg-[#25D366] hover:text-white  px-7 py-3 text-[1.1rem] font-normal text-black shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-black rounded-full tracking-tighter relative"
          >
            <p className='z-50'>Download
            <i className="bx bx-arrow-to-bottom text-[1.3rem] ms-3 font-light flex items-center"></i>
            </p>
            
            <div
            className="animate-circle-div h-52 w-52 mt-[2.5rem] rounded-full bg-black absolute top-0 left-1/2 -translate-x-1/2 transform opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-[-4rem] transition-all duration-1000"
            ></div>
          </button>
        </span>

  
          {/* Dropdown */}
          <Menu as="div" className="relative ml-3 sm:hidden">
            <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
              More
              <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1.5 size-5 text-gray-400" />
            </MenuButton>
  
            <MenuItems
              transition
              className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  Edit
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  View
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    )
  }
  