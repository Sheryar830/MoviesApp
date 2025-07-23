import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { image185 } from "../api/moviedb";

export default function Cast({ cast = [], navigation }) {
  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ color: "white", fontSize: 18, marginLeft: 15 }}>
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast
          .filter((person) => person.profile_path) // ✅ skip people without image
          .map((person, index) => (
            <TouchableOpacity
              key={index}
              className="mr-4 items-center"
              onPress={() => navigation.navigate("Person", person)}
            >
              <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500 mt-3">
                <Image
                  source={{ uri: image185(person.profile_path) }}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
              </View>
              <Text className="text-white text-xs mt-1">
                {person.name?.length > 15
                  ? person.name.slice(0, 15) + "..."
                  : person.name}
              </Text>
              <Text className="text-neutral-400 text-xs mt-1">
                {person.character?.length > 15
                  ? person.character.slice(0, 15) + "..."
                  : person.character}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
