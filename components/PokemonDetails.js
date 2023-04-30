import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  pokemonName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  pokemonDetails: {
    marginBottom: 20,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    fontWeight: 'bold',
  },
});

const PokemonDetails = ({ pokemon, onClose }) => {
  return (
    <View style={styles.modalContentContainer}>
      <Text style={styles.pokemonName}>{pokemon.name}</Text>
      <View style={styles.pokemonDetails}>
        <Text>Type: {pokemon.type.join(', ')}</Text>
        <Text>Height: {pokemon.height}</Text>
        <Text>Weight: {pokemon.weight}</Text>
      </View>
      <Image source={{ uri: pokemon.img }} style={styles.pokemonImage} />
      <TouchableOpacity onPress={onClose} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Pokemons</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PokemonDetails;
