import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardText: {
    marginTop: 10,
    textAlign: 'center',
  },
});

const PokemonCard = ({ pokemon, handlePress }) => {
  return (
    <TouchableOpacity onPress={() => handlePress(pokemon)}>
      <View style={styles.card}>
        <Image source={{ uri: pokemon.img }} style={styles.cardImage} />
        <Text style={styles.cardText}>{pokemon.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;
