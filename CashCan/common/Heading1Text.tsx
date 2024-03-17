import React from 'react';
import { StyleSheet, Text  } from 'react-native';

interface Heading1TextProps {
  children: React.ReactNode,
  size?: number,
  color?: string
}

export const Heading1Text = ({ children, size = 34, color = '#000' }: Heading1TextProps) => {
  const textStyles = StyleSheet.create({
    text: {
      fontFamily: 'BebasKai',
      fontSize: size,
      color: color,
    }
  });

  return <Text style={textStyles.text}>{children}</Text>
}