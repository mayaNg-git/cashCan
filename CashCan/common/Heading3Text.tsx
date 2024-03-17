import React from 'react';
import { StyleSheet, Text  } from 'react-native';

interface Heading3TextProps {
  children: React.ReactNode,
  size?: number,
  color?: string
}

export const Heading3Text = ({ children, size = 25, color = '#000' }: Heading3TextProps) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'BebasKai',
      fontSize: size,
      color: color
    }
  });

  return <Text style={styles.text}>{children}</Text>
}
