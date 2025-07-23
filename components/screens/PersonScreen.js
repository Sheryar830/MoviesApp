import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles } from "../..";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../MovieList";
import Loading from "../Loading";
import { image500, fetchPersonDetails ,fetchPersonMovies } from "../../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
  const navigation = useNavigation();
  const { params: person } = useRoute(); // 👈 passed from Cast.js

  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [personDetails, setPersonDetails] = useState(null);
const [personMovies, setPersonMovies] = useState([]);

  const size = width * 0.6;

  useEffect(() => {
  getPersonDetails(person.id);
  getPersonMovies(person.id);
}, []);
  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    setPersonDetails(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
  const data = await fetchPersonMovies(id);
  if (data?.cast) {
    setPersonMovies(data.cast); // you can .slice(0, 10) if needed
  }
};
  return (
    <ScrollView
      className="flex-1 bg-neutral-900 overflow-hidden"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4 " +
          verticalMargin
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <View>
          {/* Person Image */}
          <View className="flex-row justify-center" style={{ marginTop: 20 }}>
            <Image
              source={{
                uri: personDetails?.profile_path
                  ? image500(personDetails.profile_path)
                  : require("../../assets/images/person.jpg"),
              }}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                resizeMode: "cover",
              }}
            />
          </View>

          {/* Person Info */}
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {personDetails?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {personDetails?.place_of_birth}
            </Text>

            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">
                  {personDetails?.gender === 1
                    ? "Female"
                    : personDetails?.gender === 2
                    ? "Male"
                    : "Other"}
                </Text>
              </View>
              <View className="border-r-2 border-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">
                  {personDetails?.birthday}
                </Text>
              </View>
              <View className="border-r-2 border-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">
                  {personDetails?.known_for_department}
                </Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">
                  {personDetails?.popularity.toFixed(1)}
                </Text>
              </View>
            </View>

            {/* Bio */}
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
             <Text className="text-neutral-400 tracking-wide leading-6">
  {personDetails?.biography
    ? personDetails.biography.length > 500
      ? personDetails.biography.slice(0, 500) + "..."
      : personDetails.biography
    : "Biography not available."}
</Text>
            </View>
          </View>
        </View>
      )}

      <MovieList title="Movies" data={personMovies} />

    </ScrollView>
    
  );
}
