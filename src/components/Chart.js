import React from 'react';
import {Text, View, Image} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import moment from 'moment';
import {FONTS, COLORS, SIZES, icons} from '../constants';

const Chart = ({chartPrices, containerStyle}) => {
  // Points
  let startUnixTimestamps = moment().subtract(7, 'days').unix();
  let data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTimestamps + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({data, range: 40});

  const formatUSD = (value) => {
    'worklet';

    if (value === '') {
      return '';
    }
    return `$${Number(value).toFixed(2)}`;
  };

  const formatDateTime = (value) => {
    'worklet';

    if (value === '') {
      return '';
    }
    var selectedDate = new Date(value * 1000);
    let date = `0${selectedDate.getDate()}`.slice(-2);
    let month = `0${selectedDate.getMonth() + 1}`.slice(-2);
    return `${date}/${month}`;
  };

  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return value.toFixed(roundingPoint);
    }
  };

  const getYAxisLabelValue = () => {
    if (chartPrices != undefined) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);
      let midValue = (minValue + maxValue) / 2;
      let higherMidValue = (minValue + midValue) / 2;
      let lowerMidValue = (maxValue - midValue) / 2;

      let roundingPoint = 2;
      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    } else {
      return [];
    }
  };

  return (
    <View style={{...containerStyle}}>
      {/* Y Axis Label */}
      <View
        style={{
          position: 'absolute',
          color: COLORS.white,
          left: SIZES.padding,
          top: 0,
          bottom: 0,
          justifyContent: 'space-between',
        }}>
        {/* getYAxisLabelValue */}
        {getYAxisLabelValue().map((item, index) => {
          return (
            <Text
              key={index}
              style={{
                color: COLORS.lightGray3,
                ...FONTS.body4,
              }}>
              {item}
            </Text>
          );
        })}
      </View>
      {/* Charts */}
      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: 'bezier',
          }}>
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />
          <ChartDot>
            <View
              style={{
                position: 'absolute',
                left: -35,
                width: 80,
                alignItems: 'center',
                backgroundColor: COLORS.transparentBlack1,
              }}>
              {/* Dot  */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}
              />
              {/* Y-Label */}
              <ChartYLabel
                format={formatUSD}
                style={{
                  color: COLORS.white,
                  ...FONTS.body5,
                }}
              />

              {/* X-Label */}
              <ChartXLabel
                format={formatDateTime}
                style={{
                  marginTop: 3,
                  color: COLORS.lightGray3,
                  lineHeight: 15,
                  ...FONTS.body5,
                }}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
