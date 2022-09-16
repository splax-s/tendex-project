import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import Colors from "../constants/Colors";
import Context from "../hooks/provider";

const LoaderScreen = ({navigation, route}) => {
    const context = useContext(Context);

    const [hasLocalData, setHasLocalData] = useState(true);

    const loadInfo = async () => {
      await AsyncStorage.setItem("@hasLocalData", "true");
        setTimeout(()=>{
            navigation.replace("Root");
        }, 3000)

    };

    return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color={Colors.primary} />
      <Text
        style={{
          fontFamily: "quicksand-medium",
          marginTop: 20,
        }}
      >
        Fetching your information ...
      </Text>
    </View>
    )
}

export default LoaderScreen;
