import { Asset } from 'expo-asset';
import * as Fonts from 'expo-font';
import {
  bg_img,
  clouds_bg,
  arrow_back,
  rocket_ios,
  rocket_android
} from '../assets/index';

export const cacheImages = async function(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default async function() {
  await Promise.all([
    await Fonts.loadAsync({
      MuseoRegular: require('../assets/fonts/MuseoSansRounded300.otf'),
      MuseoMedium: require('../assets/fonts/MuseoSansRounded500.otf')
    }),
    cacheImages([
      bg_img,
      clouds_bg,
      arrow_back,
      rocket_ios,
      rocket_android
    ])
  ])
}
