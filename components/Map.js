// ** Components
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

// ** Utils
import { getCenter } from 'geolib';


// ** Hooks
import { useState } from 'react';

function Map({
    searchResults
}) {
    const [selectedLocation, setSelectedLocation] = useState({})

    // ** Transform searchResults object into the 
    // ** { latitude: value, longitude: value } object
    const coordinates = searchResults.map(({long, lat}) => ({
        longitude: long,
        latitude: lat
    }))

    // ** The latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates)

    const [viewport, setVierport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    })

    console.log(selectedLocation)

    return (
       <ReactMapGL
            mapStyle="mapbox://styles/joseugal/ckvtd26vh1whc14nchw50jfht"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setVierport(nextViewport)}
        >
            {
                searchResults.map(result => (
                    <div key={`${result.long}-${result.lat}`}>
                        <Marker
                            longitude={result.long}
                            latitude={result.lat}
                        >
                            <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">📍</p>
                        </Marker>

                        {
                            selectedLocation.long === result.long && (
                                <Popup
                                    onClose={() => setSelectedLocation({})}
                                    closeOnClick={true}
                                    latitude={result.lat}
                                    longitude={result.long}
                                >
                                    {result.title}
                                </Popup>
                            )
                        }
                    </div>
                ))
            }
        </ReactMapGL>
    )
}

export default Map
