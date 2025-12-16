// src/components/CreditCardView.js

import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { formatCardNumberByBrand } from '@/functions';


const CARD_BACKGROUNDS = [
  require('../assets/images/1.jpeg'),
  require('../assets/images/2.jpeg'),
  require('../assets/images/3.jpeg'),
  require('../assets/images/4.jpeg'),
  require('../assets/images/5.jpeg'),
  require('../assets/images/6.jpeg'),
  require('../assets/images/7.jpeg'),
  require('../assets/images/8.jpeg'),
];

const getRandomOtherIndex = (current, max) => {
  if (max <= 1) return current;
  let next = current;
  while (next === current) next = Math.floor(Math.random() * max);
    return next;
};
const backgroundSource = CARD_BACKGROUNDS[getRandomOtherIndex(-1,CARD_BACKGROUNDS.length)];



const CreditCardView = ({userData,orientation,cardBrand}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const { cardHolder, cardNumber, expMonth, expYear, cvv } = userData;
  const brand = cardBrand;



//spring controls speed, I could use .timing instead of .spring for a duration variable
  useEffect(() => {
    Animated.timing(animation, {
      toValue: orientation === 'front' ? 0 : 1,
      useNativeDriver: true,
      duration: 2000,
    }).start();
  }, [orientation, animation]);


  const logoSource = {
    visa:       require('../assets/images/visa.png'),
    mastercard: require('../assets/images/mastercard.png'),
    amex:       require('../assets/images/amex.png'),
    dinersclub: require('../assets/images/dinersclub.png'),
    discover:   require('../assets/images/discover.png'),
    jcb:        require('../assets/images/jcb.png'),
    unionpay:   require('../assets/images/unionpay.png'),
    troy:       require('../assets/images/troy.png'),
    chip:       require('../assets/images/chip.png'),
  }[brand];


  // Fetch style change based on isBack boolean
  const getSideStyle = (isBack) => ({
    ...styles.card,
    transform: [
      { perspective: 1000 },
      {
        rotateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: isBack ? ['180deg', '360deg'] : ['0deg', '180deg'],
        }),
      },
    ],
  });


 const add_placeholder = (formattedInput, field_name) => {

  let padded = "";
  let maxDigits = 0;
  if (field_name === 'cardNumber'){
    // 1. Remove spaces from the already formatted input
    const rawDigits = formattedInput.replace(/\s+/g, '');
    maxDigits = brand === 'amex' ? 15 : 16;
    // 4. Pad with # up to the required length
    padded = rawDigits.padEnd(maxDigits, '#'); // e.g. "1234############"
  } else {
    maxDigits = brand === 'amex' ? 4 : 3;
    padded = formattedInput.padEnd(maxDigits, '#');
  }

  return formatCardNumberByBrand(padded, brand);
};


  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        {/* FRONT */}
        <Animated.View style={getSideStyle(false)}>
          <ImageBackground
            source={backgroundSource}
            style={styles.cardBackground}
            imageStyle={styles.cardBackgroundImage}
          >
            <View style={styles.cardFront}>
              <View style={styles.cardHeader}>
                <Image source={logoSource} style={styles.logo} />
              </View>
              <Text style={styles.cardNumberText}>
                {add_placeholder(cardNumber,'cardNumber')}
              </Text>
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.label}>CARD HOLDER</Text>
                  <Text style={styles.valueText}>{cardHolder}</Text>
                </View>
                <View>
                  <Text style={styles.label}>EXPIRES</Text>
                  <Text style={styles.valueText}>{(expMonth) + '/' + (expYear)}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* BACK */}
        <Animated.View style={getSideStyle(true)}>
          <ImageBackground
            source={backgroundSource}
            style={styles.cardBackground}
            imageStyle={styles.cardBackgroundImage}
          >
            <View style={styles.cardBackContent}>
              <View style={styles.blackStrip} />
              <View style={styles.cvvRow}>
                <Text style={styles.label}>CVV</Text>
                <View style={styles.cvvBox}>
                  <Text style={styles.backValueText}>{add_placeholder(cvv,'cvv')}</Text>
                </View>
                <View style={styles.backLogoContainer}>
                  <Image source={logoSource} style={styles.backLogo} />
                </View>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
    zIndex: 2,
  },
  cardWrapper: {
    width: 320,
    height: 200,
    marginBottom: -40, //Pulls the card down into the form
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
  cardBackground: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardBackgroundImage: {
    resizeMode: 'cover',
  },
  cardFront: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardBackContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  cardNumberText: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#aaa',
    fontSize: 10,
  },
  valueText: {
    color: 'white',
    fontSize: 16,
    marginTop: 4,
  },
  backValueText: {
    color: 'black',
    fontSize: 16,
    marginTop: 4,
  },
  blackStrip: {
    height: 40,
    backgroundColor: 'black',
    marginTop: 16,
  },
  cvvRow: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  cvvBox: {
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 8,
    padding: 8,
    alignItems: 'flex-end',
  },
  backLogoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 12,
    paddingRight: 12,
  },

  backLogo: {
    width: 50,
    height: 32,
    resizeMode: 'contain',
    opacity: 0.9,
  },

});

export default CreditCardView;
