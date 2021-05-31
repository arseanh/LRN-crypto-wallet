import React, {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {COLORS, dummyData, SIZES, icons, FONTS} from '../constants';
import {getHoldings} from '../stores/market/marketAction';
import {MainLayout} from './';
import {BalanceInfo, IconTextButton, Chart} from '../components';

const Portfolio = ({getHoldings, myHoldings}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
    }, []),
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  const renderCurrentBalanceSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        {/* Header - Currnent Balance */}
        <Text style={{marginTop: 50, color: COLORS.white, ...FONTS.largeTitle}}>
          Portfolio
        </Text>
        <BalanceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          changePtc={percChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        {/* Header - Currnent Balance */}
        {renderCurrentBalanceSection()}

        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.value
              : myHoldings[0]?.sparkline_in_7d?.value
          }
        />

        {/* Yout assets */}
        <FlatList
          data={myHoldings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View
              style={{
                marginBottom: SIZES.radius,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontSize: 18,
                }}>
                Your Assets
              </Text>
              <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                  }}>
                  Assets
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({item}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setSelectedCoin(item)}>
                {/* Logo */}
                <View
                  style={{
                    width: 35,
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: 20,
                      height: 30,
                    }}
                  />
                </View>
                {/* Name */}
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}>
                    {item.name}
                  </Text>
                </View>

                {/* Price */}
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    $ {item.current_price.toLocaleString()}
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
                            item.price_change_percentage_7d_in_currency > 0
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
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>

                {/* Holdings */}
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    $ {item.total.toFixed(2)}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    <Text
                      style={{
                        marginLeft: 5,
                        color: COLORS.lightGray3,
                        ...FONTS.h5,
                        lineHeight: 15,
                      }}>
                      {item.qty} {item.symbol.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: 50,
              }}
            />
          }
        />
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      dispatch(
        getHoldings(
          holdings,
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
