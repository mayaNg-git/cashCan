import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle  } from 'react-native';

interface BodyTextProps {
  children: React.ReactNode,
  size?: number,
  color?: string,
  margin?: number,
}

export const BodyText = ({ children, margin, size = 16, color = '#000' }: BodyTextProps) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'BebasKai',
      fontSize: size,
      color: color,
      margin: margin
    }
  });

  return <Text style={styles.text}>{children}</Text>
}