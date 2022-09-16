import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import {Picker} from '@react-native-picker/picker'

const CustomSelectorTextInput = () => {
  return (
    <View>
      <Text>CustomSelectorTextinput</Text>
    </View>
  )
}

export default CustomSelectorTextInput

const styles = StyleSheet.create({
    label: {
        color: 'rgba(4, 23, 42, 0.7)',
        fontSize: 12,
        fontFamily: "quicksand-medium",
        padding: 0,
        margin: 0,
        marginBottom: 2,
      },

      placeholder: {},

      text: {
        width: "100%",
        borderWidth: 0,
        borderRadius: 3,
        fontSize: 13,
        fontFamily: "quicksand-medium",
      },
})
