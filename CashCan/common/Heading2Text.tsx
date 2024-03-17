import React from 'react';
import { StyleSheet, Text  } from 'react-native';

interface Heading2TextProps {
  children: React.ReactNode,
  size?: number,
  color?: string
}

export const Heading2Text = ({ children, size = 28, color = '#000' }: Heading2TextProps) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'BebasKai',
      fontSize: size,
      color: color
    }
  });

  return <Text style={styles.text}>{children}</Text>
}
