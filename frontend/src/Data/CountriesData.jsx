import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { countries } from "countries-list";
import PropType from 'prop-types';

const CountriesData = (props) => {

  const countriesWithFlags = Object.entries(countries).map(([key, country]) => ({
    name: country.name || "Unknown", // Fallback for missing name
    flag: key
      ? `https://flagcdn.com/${key.toLowerCase()}.svg`
      : "https://via.placeholder.com/150",
    phoneCode: country.phone ? `+${country.phone}` : "N/A",
  }));

  function handleCountryClick(e, country) {
    props.setSelectedCountry(country);
  }

  function getCountryDataList() {
    return countriesWithFlags.map((country, index) => (
      <MenuItem onClick={(e) => handleCountryClick(e, country)} key={index} as="div" className="flex items-center gap-2 mb-2 py-1.5">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-8 h-5 border border-gray-300"
        />
        <span className='w-52 font-normal tracking-wide'>{country.name}</span><span>{country.phoneCode}</span>
      </MenuItem>
    ));
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full mt-1 justify-center hover:scale-[1.01] transition-all gap-x-1.5 rounded-full bg-white px-7 py-[18px] text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-black hover:bg-gray-50">
        <img
          src={props.selectedCountry.flag}
          alt={`${props.selectedCountry.name} flag`}
          className="w-8 h-5 border border-gray-300"
        />
        <span className='w-52 text-start font-normal tracking-wide'>{props.selectedCountry.name}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-black"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute border shadow-2xl left-0 z-10 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-2xl py-4 px-2 bg-white ring-1 ring-black/5 transition focus:outline-none"
      >
        <div className="py-1 overflow-y-scroll p-3 max-h-64 ">{getCountryDataList()}</div>
      </MenuItems>
    </Menu>
  );
};

CountriesData.propTypes = {
  selectedCountry: PropType.object.isRequired,
  setSelectedCountry: PropType.func.isRequired,
};

export default CountriesData;
