import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { styles } from "..";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

export default function MovieList({ title, data }) {
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        <TouchableOpacity>
          <Text style={styles.text} className="text-lg">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data
          .filter((item) => item.poster_path && item.title) 
          .map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{ uri: image500(item.poster_path) }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.25,
                    marginTop: 10,
                  }}
                  className="rounded-3xl"
                  resizeMode="cover"
                />
                <Text className="text-white mt-1" numberOfLines={1}>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
    </View>
  );
}
