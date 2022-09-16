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
import { MaterialCommunityIcons } from '@expo/vector-icons';



const CustomTextInput = React.forwardRef(({
    style,
    onLayout = () => {},
    onChangeText,
    onBlur,
    value,
    placeholder,
    label,
    error,
    onSubmitEditing,
    returnKeyType,
    password,
    onPressIn,
    onFocus,
    keypad,
    defaultValue,
    tapFunction = () => {},
    editable = true,
    dropdown = false,
    contact= false
  },
  ref
) => {
  const [showPassword, setShowPassword] = useState(!password);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        ref.current.focus();
        tapFunction();
      }}
    >

      <View
      onLayout = {onLayout}
        style={[
          {
            backgroundColor: "#FFFFFF",
            padding: 15,
            paddingHorizontal: 22,
            borderRadius: 3,
            flexDirection: "row",
            alignItems: "center",
            borderColor: error === undefined ? "rgba(4, 23, 42, 0.7)" : Colors.warning,
            borderWidth: error === undefined ? 1 : 1,
          },
          style,
        ]}
      >
        <View style={{ justifyContent: "center", width: "90%" }}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            onPressIn={onPressIn}
            onFocus={onFocus}
            blurOnSubmit={false}
            editable={editable}

            secureTextEntry={!showPassword}
            style={[
              styles.text,
              { color: editable ? "black" : 'black' },
            ]}
            placeholder={placeholder}
            placeholderTextColor={Colors.grey}
            keyboardType={keypad}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            ref={ref}
            defaultValue={defaultValue}
          />
        </View>
        <TouchableOpacity
            onPress={tapFunction}
            style={{ marginLeft: "auto" }}
          >
            { contact ? (  <AntDesign name="contacts" size={24} color={Colors.outline}/>
            ) : (
              null
            )}

        {dropdown ? (
              <MaterialCommunityIcons name="arrow-up-down-bold-outline" size={24} color={'#7B7F8E'} />
            ) : (
              null
            )}
             </TouchableOpacity>
        {password ? (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            style={{ marginLeft: "auto" }}
          >
            {showPassword ? (
              <Feather name="eye" size={24} color={Colors.grey} />
            ) : (
              <Feather name="eye-off" size={24} color={Colors.grey} />
            )}


          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}
);

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
});

export default CustomTextInput;
