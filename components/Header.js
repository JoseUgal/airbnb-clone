// ** Next Components
import Image from "next/image"

// ** Icons
import { 
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon
} from "@heroicons/react/solid"

// ** Components Styles
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// ** Components
import { DateRangePicker } from "react-date-range";


// ** Hooks
import { useState } from "react"
import { useRouter } from "next/dist/client/router";


function Header({
    placeholder
}) {

    const [searchInput, setSearchInput ] = useState('')

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [noOfGuests, setNoOfGuests] = useState(1)

    const router = useRouter()

    const handleClickCancel = () => {
        if( searchInput ){
            setSearchInput('')
        }
    }

    const handleClickSearch = () => {
        console.log('search: ', searchInput)
        router.push({
            pathname: '/search',
            query: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                location: searchInput,
                noOfGuests
            }
        })
    }

    const handleSelectRange = (props) => {
        const { Selection } = props
        setStartDate(Selection.startDate)
        setEndDate(Selection.endDate)
    }

    const handleChangeNumber = (ev) => {
        setNoOfGuests(ev.target.value)
    }

    const selectionRange = {
        startDate,
        endDate,
        key: 'Selection'
    }

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            {/* left */}
            <div className="relative flex items-center h-10 cursor-pointe my-auto">
                <Image 
                    className="cursor-pointer"
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c513.png"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                    onClick={() => router.push('/')}
                />
            </div>

            {/* Middle */}
            <div className="flex items-center border-2 rounded-full py-2 md:shadow-sm"> 
                <input 
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400" 
                    type="text" 
                    placeholder={placeholder || "Start your search"} 
                />
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />
                
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>

            { searchInput && (
                <div className="flex flex-col col-span-3 mx-auto pt-4">
                    <DateRangePicker  
                        ranges={[selectionRange]}
                        onChange={handleSelectRange}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        color={"#FD5B61"}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl pl-2 flex-grow font-semibold">Number of Guests</h2>

                        <UsersIcon className="h-5" />
                        <input 
                            type="number" 
                            className="w-12 pl-2 text-lg outline-none text-red-400"
                            value={noOfGuests}
                            min={1}
                            onChange={handleChangeNumber} 
                        />
                    </div>
                    {/* Emmet for react  */}
                    <div className="flex">
                        <button onClick={handleClickCancel} className="flex-grow text-gray-500">Cancel</button>
                        <button onClick={handleClickSearch} className="flex-grow text-red-400">Search</button>
                    </div>
                </div>
            )}

        </header>
    )
}

export default Header
