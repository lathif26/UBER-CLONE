import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from '@env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core'
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements'


const NavigateCard = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
        <Text style={tw`text-center py-5 text-xl`}>Good Morning, Lathifa</Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
            
            <GooglePlacesAutocomplete 
                    styles={toInputBoxStyles}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    
                    }}
                    onPress={(data, details = null)=>{
                        console.log("text box is selected")
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description,
                        }))
                        navigation.navigate('RideOptionsCard');
                    }}
                    minLength={2}
                    returnKeyType= {"search"}
                    fetchDetails = {true}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    placeholder="Where to ?"
                    enablePoweredByContainer = {false}

                />
            </View>
            {/* <NavFavourites/> */}
            <View  style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`} >
                <TouchableOpacity style={tw`flex flex-row bg-black w-24 px-4 justify-between py-3 rounded-full`}
                    onPress={() => navigation.navigate('RideOptionsCard')}
                >
                    <Icon 
                        type = 'font-awesome'
                        name = 'car'
                        color={'white'}
                        size={16}
                    />
                    <Text style={tw`text-white text-center`}>Car</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row bg-white border w-24 px-4 justify-between py-3 rounded-full`}>
                    <Icon 
                        type = 'ionicon'
                        name = 'fast-food-outline'
                        color={'black'}
                        size={16}
                    />
                    <Text style={tw`text-black text-center`}>Eat</Text>
                </TouchableOpacity>
            
        </View>
    </SafeAreaView>
      
    
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        borderColor: "white",
        paddingTop: 20,
        flex: 0,
        
    },
    textInputContainer: {
        paddingHorizontal: 10,
        paddingBottom: 0
    },
    textInput: {
        height: 38,
        borderRadius: 0,
        fontSize: 18,
        height: 45,
        borderWidth: 1
        
    }
})