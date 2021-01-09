/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as firebase from 'firebase';

const App = () => {

  const [data, setData] = useState()

  
var firebaseConfig = {
  apiKey: "AIzaSyC3jzXWuPCLu-Y0i3uktsKbuPC5M0rRJ_I",
  authDomain: "reactnativefirebase-1531e.firebaseapp.com",
  projectId: "reactnativefirebase-1531e",
  storageBucket: "reactnativefirebase-1531e.appspot.com",
  messagingSenderId: "940389036786",
  appId: "1:940389036786:web:ebd5e56cde12deb48fd66b",
  measurementId: "G-JWNHQ9JB7X"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();
  
function storeNewStudent(documentId, studentId, name, address) {
  firebase.database().ref('students/' + documentId).set({
                StudentID: studentId,
                Name : name,
                Address : address
            }, function(error) {
              if (error) {
                // The write failed...
                alert('Loi')
              } else {
                // Data saved successfully!
                alert('Thanh cong!!!')
              }
            });
  }
//   const deleteData=(documentId)=>{
//     firebase.database().ref('students/' + documentId).remove();
//   }

//   const readUserData = () => {
//     firebase.database().ref('students/').on('value', function    (snapshot) {
//         console.log(snapshot.val())
//     });
// }

useEffect(() => {
  firebase.database().ref('students/').on('value', function    (snapshot) {
    let array = [];
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      array.push({
        id : childSnapshot.key,
        name : childData.Name,
        address : childData.Address,
        studentId : childData.StudentID
      });
    });
    setData(array);
  });
}, [])

  return (
    <View>
      <Text>Home</Text>

      <TouchableOpacity
        onPress={storeNewStudent(1,1,"dopv","nam dinh")}
      >
        <View>
          <Text>Toogle item</Text>
        </View>
      </TouchableOpacity>
      {/* <FlatList style = {{flex :1}} 
        data = {this.state.data} 
        renderItem={({item}) => <Text>Hello : {item.name}</Text>}
        keyExtractor = {(item, index) =>  item.id}
        /> */}
    </View>
  );
};

export default App;
