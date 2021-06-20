import React from 'react';
import { Component } from 'react';
import {TouchableOpacity,Text,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';

const styles = StyleSheet.create({
  sideButtonContainer: {
    padding: 15,
  },
  sideButtonText: {
    fontSize: 18,
    color: colors.white,
  },
});

class Sidebutton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      title='',
      pressFunction=() => {},
      iconName='glass-mug-variant'
    } = this.props;
    return(
      <TouchableOpacity
        style={styles.sideButtonContainer}
        onPress={()=> pressFunction()}
      >
        <Text style={styles.sideButtonText}><Icon name={iconName} size={18} />  {title}</Text>
      </TouchableOpacity>
    ); 
  }
}

export default Sidebutton;