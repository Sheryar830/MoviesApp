import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";

import { styles, theme } from "../..";
import Cast from "../Cast";
import MovieList from "../MovieList";
import Loading from "../Loading";
import {
  fetchMoviesDetail,
  fetchMoviesCredits,
  fetchMoviesSimilar,
  image500,
} from "../../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const navigation = useNavigation();
  const { params: item } = useRoute();

  const [movie, setMovie] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails(item.id);
    loadMovieCredits(item.id);
    loadSimilarMovies(item.id);
  }, [item]);

  const loadMovieDetails = async (id) => {
    setLoading(true);
    const data = await fetchMoviesDetail(id);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };

  const loadMovieCredits = async (id) => {
    const data = await fetchMoviesCredits(id);
    if (data?.cast) {
      setCast(data.cast.slice(0, 12)); // show top 12
    }
  };

  const loadSimilarMovies = async (id) => {
    const data = await fetchMoviesSimilar(id);
    if (data?.results) {
      setSimilarMovies(data.results.slice(0, 10));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900 overflow-hidden"
    >
      {/* Header Controls */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin
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
            <HeartIcon
              size={35}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Banner */}
            <View>
              <Image
                source={{ uri: image500(movie?.poster_path) }}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{
                  width,
                  height: height * 0.4,
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </View>

            {/* Movie Info */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
              <Text className="text-white text-center text-3xl font-bold tracking-wider">
                {movie?.title}
              </Text>

              <Text
                className="text-neutral-400 font-semibold text-base text-center"
                style={{ marginTop: 5 }}
              >
                {movie?.release_date?.split("-")[0]} · {movie?.runtime} min
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("LocalVideo")}
                className="mx-4 mt-4 bg-red-600 p-3 rounded-xl"
              >
                <Text className="text-white text-center font-bold text-lg">
                  Watch Now
                </Text>
              </TouchableOpacity>

              {/* Genres */}
              <View style={{ marginTop: 3, marginHorizontal: 16 }}>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  {movie?.genres?.map((g) => g.name).join(" · ")}
                </Text>
              </View>

              {/* Overview */}
              <Text
                className="text-neutral-400 mx-4 tracking-wide"
                style={{ marginTop: 15 }}
              >
                {movie?.overview}
              </Text>
            </View>

            {/* Cast & Similar */}
            <Cast navigation={navigation} cast={cast} />
            <MovieList title="Similar Movies" data={similarMovies} />
          </>
        )}
      </View>
    </ScrollView>
  );
}
