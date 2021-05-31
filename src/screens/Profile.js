import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  Switch,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {connect} from 'react-redux';
import {COLORS, constants, SIZES, icons, FONTS, dummyData} from '../constants';
import {getCoinMarket} from '../stores/market/marketAction';
import {MainLayout} from './';
import {HeaderBar, TextButton} from '../components';

const SectionTitle = ({title}) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}>
      <Text style={{color: COLORS.lightGray3}}>{title}</Text>
    </View>
  );
};

const Setting = ({title, value, type, onPress}) => {
  if (type === 'button') {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
        }}
        onPress={onPress}>
        <Text style={{flex: 1, color: COLORS.white, ...FONTS.h3}}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginRight: SIZES.radius,
              color: COLORS.lightGray3,
              ...FONTS.h3,
            }}>
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
        }}>
        <Text style={{flex: 1, color: COLORS.white, ...FONTS.h3}}>{title}</Text>
        <Switch value={value} onValueChange={(value) => onPress(value)} />
      </View>
    );
  }
};

const Profile = () => {
  const [faceID, setFaceID] = useState(true);
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}>
        {/* Header */}
        <HeaderBar title="Profile" />
        {/* Details  */}
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
            }}>
            {/* Email & ID */}
            <View
              style={{
                flex: 1,
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>
                {dummyData.profile.email}
              </Text>
              <Text style={{color: COLORS.lightGray3, ...FONTS.body4}}>
                ID: {dummyData.profile.id}
              </Text>
            </View>
            {/* Status */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={icons.verified}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
              <Text
                style={{
                  color: COLORS.lightGreen,
                  ...FONTS.h3,
                  marginLeft: SIZES.base,
                }}>
                Verified
              </Text>
            </View>
          </View>

          {/* App */}
          <SectionTitle title="APP" />
          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log('Pressed~')}
          />
          <Setting
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log('Pressed~')}
          />
          {/* Account */}
          <SectionTitle title="ACCOUNT" />
          <Setting
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log('Pressed~')}
          />
          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log('Pressed~')}
          />

          {/* Security */}
          <SectionTitle title="SECURITY" />
          <Setting
            title="FaceID"
            value={faceID}
            type="switch"
            onPress={(value) => setFaceID(value)}
          />
          <Setting
            title="Password Settings"
            value=""
            type="button"
            onPress={() => console.log('Pressed~')}
          />
          <Setting
            title="Change Password"
            value=""
            type="button"
            onPress={() => console.log('Pressed~')}
          />
          <Setting
            title="2-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log('Pressed~')}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
