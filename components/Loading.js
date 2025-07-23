import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { theme } from '..';

const { width, height } = Dimensions.get('window');

export default function Loading() {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-row justify-center items-center bg-neutral-900"
    >
      <Progress.CircleSnail thickness={10} size={100} color={theme.background} />
    </View>
  );
}
