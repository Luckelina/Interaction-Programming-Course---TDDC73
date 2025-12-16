import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';


//Views

import CreditCardView from "../components/CreditCardView";
import FormView from "../components/FormView";


//Functions
import { detectCardBrand } from '@/functions';





export default function App() {

  //const creditCardForm = new CreditCardForm();
  //const userData = new UserData();
  //const orientation = 'front'

  const [userData, setUserData] = useState({
    cardNumber: '',
    cardHolder: '',
    expMonth: '',
    expYear: '',
    cvv: '',
  });

  //This is used to rewrite the entire userData. Called whenever the user types anything in FormView.
  const handleFieldChange = (fieldName:string, value:string) => {
    setUserData(prev => ({
      ...prev,
      [fieldName]: value,   //dynamic key... hate how this works but sure!
    }));
  };

  const [cardBrand, setCardBrand] = useState(
    'mastercard'
  );

  useEffect(() => {
    setCardBrand(detectCardBrand(userData['cardNumber']));
  }, [userData['cardNumber']]);



  const [orientation, setOrientation] = useState(
    'front'
  );





  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        
        <Text style={styles.title}>Credit Card Simulator :)</Text>

        
        <CreditCardView
        userData={userData}
        orientation={orientation}
        cardBrand={cardBrand}
        />

        
        <View style={styles.formWrapper}>
          <FormView
          userData={userData}
          handleFieldChange={handleFieldChange}
          cardBrand={cardBrand}
          setOrientation={setOrientation}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  formWrapper: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: -40,        // pulls the form up under the card nicely
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
    zIndex: 1,
  },

});
