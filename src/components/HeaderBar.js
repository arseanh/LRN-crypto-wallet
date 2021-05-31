import React from 'react';
import {Text, View} from 'react-native';
import {FONTS, COLORS, SIZES} from '../constants';

const HeaderBar = ({title}) => {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: 'flex-end',
      }}>
      {/* Header - Currnent Balance */}
      <Text style={{color: COLORS.white, ...FONTS.largeTitle}}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
