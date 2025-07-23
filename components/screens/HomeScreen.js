import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../..";
import TrendingMovies from "../TrendingMovies";
import MovieList from "../MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import {
  fetchTrendingMovies,
  topRatedTrendingMovies,
  upcomingTrendingMovies,
} from "../../api/moviedb";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await upcomingTrendingMovies();
    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    const data = await topRatedTrendingMovies();
    if (data && data.results) setToprated(data.results);
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-neutral-800 overflow-hidden">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" backgroundColor="#171717" translucent={false} />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon
            onPress={() => navigation.openDrawer()}
            size="30"
            strokeWidth={2}
            color="white"
          />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* Upcoming movies row */}
          <MovieList title="Upcoming" data={upcoming} />

          {/* Top rated movies row */}
          <MovieList title="Top Rated" data={toprated} />
        </ScrollView>
      )}
    </View>
  );
}
