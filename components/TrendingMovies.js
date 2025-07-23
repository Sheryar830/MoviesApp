import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View
        className="rounded-3xl overflow-hidden bg-black/20"
        style={{ width: width * 0.7, height: height * 0.5 }}
      >
        <Image
          source={{ uri: image500(item.poster_path) }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) =>{
    navigation.navigate('Movie' , item)

  }
  return (
    <View className="-mb-4">
      <Text className="text-white text-xl mx-4  ">Trending</Text>
      <Carousel
        width={width * 0.8}
        height={height * 0.5}
        data={data}
        loop
        mode="parallax"
        autoPlay={false}
        scrollAnimationDuration={900}
        modeConfig={{
        }}
        renderItem={({ item }) => <MovieCard item={item}  handleClick= {handleClick}    />}
        style={{ alignSelf: 'center', marginTop: -15 }}
      />
    </View>
  );
}
