import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const ErrorText = (props) => {
    return (
        <Text style = {styles.text}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    text : {
        color :  Colors.warning,
        fontFamily : 'quicksand-medium',
        fontSize : 12,
        paddingTop : 15,
        paddingLeft : 5
    }
});

export default ErrorText;
