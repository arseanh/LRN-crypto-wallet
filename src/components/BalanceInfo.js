import React from 'react';
import {Text, View, Image} from 'react-native';
import {FONTS, COLORS, SIZES, icons} from '../constants';

const BalanceInfo = ({title, displayAmount, changePtc, containerStyle}) => {
  return (
    <View style={{...containerStyle}}>
      {/* Title */}
      <Text
        style={{
          color: COLORS.white,
        }}>
        {title}
      </Text>

      {/* Figure */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.lightGray,
          }}>
          $
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            ...FONTS.h2,
            color: COLORS.white,
          }}>
          {displayAmount.toLocaleString()}
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            ...FONTS.h3,
            color: COLORS.lightGray,
          }}>
          USD
        </Text>
      </View>

      {/* Change Percentage */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        {changePtc != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: 'center',
              tintColor: changePtc > 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                changePtc > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            color:
              changePtc == 0
                ? COLORS.lightGray2
                : changePtc > 0
                ? COLORS.lightGreen
                : COLORS.red,
            ...FONTS.h4,
          }}>
          {changePtc.toFixed(2)}%
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            color: COLORS.lightGray3,
            ...FONTS.h5,
          }}>
          7d change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
