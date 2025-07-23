import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';
import { searchMovies } from '../../api/moviedb';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 30;

export default function SearchScreen() {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.length > 2) {
      setLoading(true);
      const data = await searchMovies(text);
      if (data && data.results) {
        setSearchResults(data.results);
      } else {
        setSearchResults([]);
      }
      setLoading(false);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1 overflow-hidden">
      {/* Search Bar */}
      <View className="mx-4 mt-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerHome')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Loading Spinner */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Results Count */}
          {searchQuery.length > 2 && (
            <Text className="text-white mx-4 mb-2 text-base font-semibold">
              Results ({searchResults.length})
            </Text>
          )}

          {/* No Results Fallback */}
          {searchResults.length === 0 && searchQuery.length > 2 ? (
            <View className="flex-1 justify-center items-center mb-10">
              <Image
                source={require('../../assets/images/movietime.png')}
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
              />
            </View>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
              renderItem={({ item }) => {
                const poster =
                  item.poster_path && typeof item.poster_path === 'string'
                    ? { uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }
                    : require('../../assets/images/moviePoster1.png');

                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Movie', item)}
                    style={{ width: cardWidth }}
                    className="bg-neutral-700 rounded-3xl overflow-hidden"
                  >
                    <Image source={poster} style={{ height: 220, width: '100%' }} />
                    <Text
                      numberOfLines={1}
                      className="text-white text-sm font-semibold px-2 py-1"
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
