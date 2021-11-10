// ** Components
import Header from "../components/Header"
import Footer from "../components/Footer"
import Map from "../components/Map"

// ** Utils
import { format } from "date-fns"

// ** Hooks
import { useRouter } from "next/dist/client/router"
import InfoCard from "../components/InfoCard"

function Search({
    searchResults
}) {

    const router = useRouter()
    const { startDate, endDate, location, noOfGuests } = router.query
    
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} to ${formattedEndDate}`

    console.log(searchResults)

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
                <main className="flex">
                    <section className="flex-grow pt-14 px-6">
                        <p className="text-xs">300+ Stays - {range} - for {noOfGuests} guests</p>

                        <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                        <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                            <p className="button">Cancellation Flexibility</p>
                            <p className="button">Type of Place</p>
                            <p className="button">Proce</p>
                            <p className="button">Rooms and Beds</p>
                            <p className="button">More filters</p>
                        </div>

                        <div className="flex flex-col">
                            {
                                searchResults.map(({
                                    img,location,title,description,star,price,total,long,lat
                                }) => (
                                    <InfoCard 
                                        key={img}
                                        img={img}
                                        location={location}
                                        title={title}
                                        description={description}
                                        star={star}
                                        price={price}
                                        total={total}
                                        long={long}
                                        lat={lat}
                                    />
                                ))
                            }
                        </div>

                    </section>

                    <section className="hidden xl:inline-flex xl:min-w-[600px] xl:h-screen xl:sticky xl:top-0 xl:right-0">
                        <Map searchResults={searchResults} />
                    </section>
                </main>
            <Footer />
        </div>
    )
}

export default Search


export async function getServerSideProps( ctx ) {
    const searchResults = await fetch("https://links.papareact.com/isz")
        .then( res => res.json() )

        return {
            props: {
               searchResults 
            }
        }
}