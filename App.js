import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal,StyleSheet } from 'react-native';

const App = () => {
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
  
  
  const [pokemonList, setPokemonList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(response => response.json())
      .then(data => {
        const pokemonByType = data.pokemon.reduce((acc, pokemon) => {
          pokemon.type.forEach(type => {
            if (!acc[type]) {
              acc[type] = [];
            }
            acc[type].push(pokemon);
          });
          return acc;
        }, {});
        setPokemonList(pokemonByType);
      })
      .catch(error => console.error(error));
  }, []);

  const handlePress = (pokemon) => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };
  const renderItem = ({ item: { type, pokemon } }) => {
    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 10 }}>{type}</Text>
        <FlatList
          data={pokemon}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={styles.card}>
                <Image source={{ uri: item.img }} style={styles.cardImage} />
                <Text style={styles.cardText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.num.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };
  
  
  
  
  

  const renderModalContent = () => (
    <View style={{
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
    }}>
      <Text>{selectedPokemon.name}</Text>
      <Text>Type: {selectedPokemon.type.join(', ')}</Text>
      <Text>Height: {selectedPokemon.height}</Text>
      <Text>Weight: {selectedPokemon.weight}</Text>
      <Image source={{ uri: selectedPokemon.img }} style={{ width: 100, height: 100, marginTop: 10, marginBottom: 20 }} />
      <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'stretch' }}>
        <View style={{
          backgroundColor: '#E5E5E5',
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignSelf: 'center',
        }}>
          <Text>Back to Pokemons</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <View>
<FlatList
  data={Object.entries(pokemonList).map(([type, pokemon]) => ({ type, pokemon }))}
  renderItem={renderItem}
  keyExtractor={item => item.type}
/>
<Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} transparent={true}>
  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, justifyContent: 'center' }}>
    <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center', elevation: 5, margin: 50 }}>
      {selectedPokemon && renderModalContent()}
    </View>
  </View>
</Modal>
    </View>
  );
};

export default App;