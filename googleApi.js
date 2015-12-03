var googleApiKey = [],
googleApiCx = []
// Primera
googleApiKey.push( 'AIzaSyAz1NiruPN1AK3dXgBmDmqexpqpfumpA88' )
googleApiCx.push( '017551480749949825364:6squxmjqono' )
/*
// Segunda
googleApiKey.push( 'AIzaSyCrCUJo9XqRTqmDPSxFLBCww7XeWfywdI4' )
googleApiCx.push( '017551480749949825364:3kq6wpahxcs' )
*/
// Patricio
googleApiKey.push( 'AIzaSyCsL2a-qWDCuc4rmENkQ3xmpRYSxJ90wLg' )
googleApiCx.push( '015755766966414827275:fsf5dmbwqkw' )

var googleMapApi = function(opciones) {
    googleMaps = this
    googleMaps.uri = 'https://maps.googleapis.com/maps/api/geocode/json'
    googleMaps.apiKey = googleApiKey[0]

    googleMaps.getCoords = new Promise(function(res,rej){ navigator.geolocation.getCurrentPosition(res) })
    googleMaps.getCoords.then( function(data) {
        googleMaps.location = {
            lat: data.coords.latitude,
            lon: data.coords.longitude
        } 
    } )

    googleMaps.changeApiKey = function() {
        googleMaps.apiKey = Math.floor( Math.random() * googleApiKey.length )
    }

    googleMaps.populate = function(ubicaciones) {
        debugger
        for(item in ubicaciones) {
            var input = document.querySelector('[name="' + ubicaciones[item] + '"]')
            if( input.tagName === 'SELECT' ) {
                Array.prototype.forEach.call( input.children,function(option){
                    if(option.textContent === googleMaps[item])
                        option.setAttribute('selected','selected')
                    else
                        option.removeAttribute('selected')
                })
            } else
                input.setAttribute('placeholder',googleMaps[item])
        }
    }

    Object.defineProperty(googleMaps, 'getLocations', {
        get: function() {
            if( !googleMaps.init ) {
                googleMaps.getCoords.then( function(data){ 
                    getPromiseAjax( googleMaps.uri )
                    .get( { 
                        latlng: googleMaps.location.lat + ',' + googleMaps.location.lon, 
                        key: googleMaps.apiKey
                    } )
                    .then( function(data){
                        googleMaps.init = true
                        data = JSON.parse(data)
                        if( data.status === 'OK') {
                            googleMaps.address_components = data.results[0].address_components
                            googleMaps.address_components.forEach(function(item){
                                if( item.types.indexOf('street_number') !== -1 )
                                    googleMaps.numero = item.long_name
                                else if( item.types.indexOf('route') !== -1 )
                                    googleMaps.calle = item.long_name
                                else if( item.types.indexOf('sublocality') !== -1 )
                                    googleMaps.colonia = item.long_name
                                else if( item.types.indexOf('locality') !== -1 )
                                    googleMaps.ciudad = item.short_name
                                else if( item.types.indexOf('administrative_area_level_2') !== -1 )
                                    googleMaps.provincia = item.long_name
                                else if( item.types.indexOf('country') !== -1 )
                                    googleMaps.pais = item.long_name
                                else if( item.types.indexOf('postal_code') !== -1 )
                                    googleMaps.cp = item.long_name
                            })
                            googleMaps.direccion = data.results[0].formatted_address
                        } else
                            googleMaps.getLocations
                    } ).catch( function(data){
                        console.log(googleMaps.apiKey)
                        consolaAjax(data)
                    } )
                } )
            }
            return googleMaps
        },
        configurable: false,
        enumerable: false
    })
}