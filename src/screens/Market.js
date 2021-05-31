/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {connect} from 'react-redux';
import {COLORS, constants, SIZES, icons, FONTS} from '../constants';
import {getCoinMarket} from '../stores/market/marketAction';
import {MainLayout} from './';
import {HeaderBar, TextButton} from '../components';

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: React.createRef(),
}));

const TabIncaditor = ({measureLayout, scrollX}) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width);
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        height: '100%',
        width: (SIZES.width - SIZES.radius * 2) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({scrollX, onMarketTabPress}) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = React.useRef();

  useEffect(() => {
    let ml = [];
    marketTabs.forEach((marketTab) => {
      marketTab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({x, y, width, height});
          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: 'row',
      }}>
      {/* Tab Indicator */}
      {measureLayout.length > 0 && (
        <TabIncaditor measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={{
              flex: 1,
            }}
            onPress={() => onMarketTabPress(index)}>
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Market = ({getCoinMarket, coins}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const markeTabScrollViewRef = React.useRef();

  const onMarketTabPress = useCallback((marketTabIndex) => {
    markeTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCoinMarket();
    }, []),
  );

  const renderTabBar = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}>
        <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}>
        <TextButton label="USD" />
        <TextButton label="% 7d" containerStyle={{marginLeft: SIZES.base}} />
        <TextButton label="Top" containerStyle={{marginLeft: SIZES.base}} />
      </View>
    );
  };

  const renderList = () => {
    return (
      <Animated.FlatList
        ref={markeTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        paddingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showHorizontalScrollIndicator={false}
        keyExtractor={(item) => `Tab-${item.id}`}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({item, index}) => {
          let priceColor =
            item.price_change_percentage_7d_in_currency == 0
              ? COLORS.lightGray3
              : item.price_change_percentage_7d_in_currency > 0
              ? COLORS.lightGreen
              : COLORS.red;
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}>
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}>
                      {/* Coins */}
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            width: 20,
                            height: 30,
                          }}
                        />
                        <Text
                          style={{
                            color: COLORS.white,
                            marginLeft: SIZES.radius,
                            ...FONTS.h3,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      {/* Line Chart */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                        }}>
                        <LineChart
                          withHorizontalLabels={false}
                          withVerticalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>

                      {/* Figure */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'right',
                            color: COLORS.white,
                            ...FONTS.h4,
                          }}>
                          $ {item.current_price}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}>
                          {item.price_change_percentage_7d_in_currency != 0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                width: 10,
                                height: 10,
                                alignSelf: 'center',
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency >
                                  0
                                    ? [{rotate: '45deg'}]
                                    : [{rotate: '125deg'}],
                              }}
                            />
                          )}
                          <Text
                            style={{
                              marginLeft: 5,
                              color: priceColor,
                              ...FONTS.h5,
                              lineHeight: 15,
                            }}>
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2,
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        {/* Header ber */}
        <HeaderBar title="Market" />

        {/* Tab bar  */}
        {renderTabBar()}

        {/* Button  */}
        {renderButtons()}

        {/* Market List */}
        {renderList()}
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
