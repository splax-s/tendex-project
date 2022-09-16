import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from "react-native-elements";
import colors from "../constants/Colors";

const CustomButton3= ({
    containerStyle,
  _onPress,
  title,
  marginTop,
  loading = false,
  disabled = false,
  color = colors.primary,
  textStyle
}) => {
  return (
    <View style={[{ marginTop: marginTop, width: 101 }, containerStyle]}>
      <Button
        title={title}
        titleStyle={[textStyle,styles.text]}
        type="solid"
        buttonStyle={[styles.button, { backgroundColor: color }]}
        containerStyle={{ borderRadius: 10 }}
        onPress={_onPress}
        loading={loading}
        loadingStyle={{ paddingVertical: 3 }}
        disabledStyle={{ backgroundColor: colors.outline }}
        disabledTitleStyle={{ color: "white" }}
        disabled={disabled}
      />
    </View>
  )
}

export default CustomButton3

const styles = StyleSheet.create({
    button: {
        padding: 14,
        paddingVertical: 16,

        borderRadius: 50,
        height: 101
      },

      text: {
        fontFamily: "quicksand-regular",
        fontSize: 16
      },
})
