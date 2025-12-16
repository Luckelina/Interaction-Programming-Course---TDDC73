import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CreditCardForm } from '../Classes/CreditCardForm';






const drawField = (field, userData, handleFieldChange, cardBrand, setOrientation) => {
        

        const evaluateFieldChange = (text) => {
            const newText = field.evaluate_input(text,cardBrand);
            if (newText !== userData[field.key]) {
              handleFieldChange(field.key, newText);
            }
        }

        const handleOrientationFocus = (front) =>{
          if (front){
            setOrientation('front')
          } else {
            setOrientation('back')
          }

        }

        if (true){
            return (
              <View key={field.key} style={styles.fieldContainer}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  value={userData[field.key]}
                  onChangeText={evaluateFieldChange}
                  onFocus={() => handleOrientationFocus(field.front)}
                  placeholder={field.placeholder}
                  maxLength={field.maxLength}
                  keyboardType={field.keyboardType}
                />
              </View>
            );
        }


}



 const FormView = ({userData, handleFieldChange, cardBrand,setOrientation}) => {
    const creditCardForm = new CreditCardForm();


    return (
        <View style={styles.container}>
            {creditCardForm.fields.map((field) => {
              return drawField(field, userData, handleFieldChange, cardBrand, setOrientation);
            })}
        </View>
    );
 };




const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 100,
    paddingVertical: 100,
    zIndex: 1,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
});

export default FormView;
