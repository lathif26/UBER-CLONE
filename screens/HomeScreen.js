import { StyleSheet, Text, Image,View, SafeAreaView , StatusBar, Platform} from 'react-native'
import React from 'react';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
  const dispatch = useDispatch();
 
  return (
    <SafeAreaView style={tw`bg-white h-full`}{...styles.androidSafeArea} >
      <View style={tw `p-5`}>
        <Image
        style={{
          width: 100,
           height: 100,
            resizeMode: "contain",
        }}
        source={{
         uri: "https://links.papareact.com/gzs",
        }}/>

<GooglePlacesAutocomplete 
        styles={{
            container: {
                flex: 0,
            },
            textInput: {
                fontSize: 18,
            },
            textInputContainer: {
                paddingHorizontal: 10,
                marginHorizontal: 5,
            },
            predefinedPlacesDescription: {
                color: '#1faadb',
            },
        }}

        query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
            
            
        }}
        onPress = {(data, details=null) => {
         
            dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description
            }))

            dispatch(setDestination(null))
        }}
        minLength={2}
        returnKeyType= {"search"}
        fetchDetails = {true}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={400}
        placeholder="Where From?"
        enablePoweredByContainer = {false}
      />

        <NavOptions/>
        <NavFavourites/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text:{
        color:"blue",
    },
    androidSafeArea: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
});