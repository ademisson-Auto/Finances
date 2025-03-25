import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';

interface LoadingAnimationProps {
  message: string;
  progress: number;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ message, progress }) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const reverseRotation = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(reverseRotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const reverseSpin = reverseRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <View style={styles.content}>
        <View style={styles.cityscape}>
          <View style={styles.chart}>
            <View style={styles.barChart}>
              <View style={[styles.bar, styles.bar1]} />
              <View style={[styles.bar, styles.bar2]} />
              <View style={[styles.bar, styles.bar3]} />
            </View>
          </View>
          
          {/* Círculo giratório externo */}
          <Animated.View style={[styles.circleWrapper, { transform: [{ rotate: spin }] }]}>
            <Svg height="240" width="240" viewBox="0 0 100 100">
              <G>
                <Circle cx="50" cy="50" r="45" stroke="#34D399" strokeWidth="1" fill="transparent" />
                <Circle cx="50" cy="5" r="2" fill="#9333EA" />
                <Circle cx="78" cy="22" r="2" fill="#9333EA" />
                <Circle cx="95" cy="50" r="2" fill="#9333EA" />
                <Circle cx="78" cy="78" r="2" fill="#9333EA" />
                <Circle cx="50" cy="95" r="2" fill="#9333EA" />
                <Circle cx="22" cy="78" r="2" fill="#9333EA" />
                <Circle cx="5" cy="50" r="2" fill="#9333EA" />
                <Circle cx="22" cy="22" r="2" fill="#9333EA" />
              </G>
            </Svg>
          </Animated.View>
          
          {/* Círculo giratório interno (girando na direção oposta) */}
          <Animated.View style={[styles.circleWrapper, { transform: [{ rotate: reverseSpin }] }]}>
            <Svg height="160" width="160" viewBox="0 0 100 100">
              <G>
                <Circle cx="50" cy="50" r="30" stroke="#6B21A8" strokeWidth="0.8" fill="transparent" />
                <Circle cx="50" cy="20" r="1.5" fill="#9333EA" />
                <Circle cx="80" cy="50" r="1.5" fill="#9333EA" />
                <Circle cx="50" cy="80" r="1.5" fill="#9333EA" />
                <Circle cx="20" cy="50" r="1.5" fill="#9333EA" />
              </G>
            </Svg>
          </Animated.View>
        </View>
        
        <Text style={styles.message}>{message}</Text>
        
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
          <Text style={styles.progressText}>{progress}/100</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityscape: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chart: {
    position: 'absolute',
    zIndex: 2,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 80,
  },
  bar: {
    width: 20,
    marginHorizontal: 6,
    backgroundColor: '#6B21A8',
  },
  bar1: {
    height: 40,
  },
  bar2: {
    height: 80,
  },
  bar3: {
    height: 60,
  },
  circleWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  message: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  progressContainer: {
    width: 200,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#9333EA',
  },
  progressText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default LoadingAnimation; 