// import react,{useState} from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import MapView from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import * as React from 'react';

// import Constants from 'expo-constants';
// import * as Location from  'expo-location';

// const origin = {latitude: 37.3318456, longitude: -122.0296002};
// const destination = {latitude: 37.771707, longitude: -122.4053769};
// const GOOGLE_MAPS_APIKEY = 'AIzaSyBEB0wSiFglXgebNMfL5LVGNsQRVn9V4CA';

// // const [time, setTime] = React.useState(null)
// // const [location, setLocation] = React.useState(null);
// // const [errorMsg, setErrorMsg] = React.useState(null);


// export default function App() {

//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }
 
 
 
 
//   return (
//     <View style={styles.container}>
//       {/* <Text>Open up App.js to start working on your app!</Text> */}
//       <MapView style={StyleSheet.absoluteFill}
//         initialRegion={{
//           latitude: origin.latitude,
//           longitude: origin.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />

//     <MapViewDirections
//         origin={origin}
//         destination={destination}
//         apikey={GOOGLE_MAPS_APIKEY}
//       />

//       <Text style={styles.paragraph}>{text}</Text>
//       <Text style={styles.paragraph}>{time}</Text>  
//     </View>
//   );
// }






















// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';
// import * as Location from 'expo-location';




// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);


  
//   getLocationAsync = async () => {
//     const { status } = await Permissions.askAsync(Permissions.LOCATION);

//     if (status !== 'granted') {
//       this.setState({
//         errorMessage: 'Permission to access location was denied',
//       });
//       return;
//     }

//     const location = await Location.getCurrentPositionAsync({});
//     this.setState({ location });
//   };



//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }


//   return (
//     <View style={StyleSheet.buttonContainer}>
//       <Text >{text}</Text>
//     </View>
//   );





// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginVertical: 20,
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//   }
// });
// }



import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Request access for location permissions and store them

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  console.log('location',location)
  
return (
  <View style={styles.container}>
      {location ? (
        <MapView
          // Initialize the map around the user's locations
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          style={styles.map}
        >

          <Marker
          coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
        />
        </MapView>
      ) : (
        <Text style={styles.text}>{errorMsg || "Gathering location..."}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: { marginTop: 12 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
