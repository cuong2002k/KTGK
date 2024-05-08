import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AddTodo, GetTotoList, Logout, UpdateTodo, useMycontextProvider } from '../Store';
import { Button, IconButton, TextInput } from 'react-native-paper';


const TodoApp = ({ navigation }) => {
  const [controller, dispatch] = useMycontextProvider();
  const [todos, settodos] = useState([]);
  const { userLogin } = controller;
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    if (userLogin) {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            icon="keyboard-backspace"
            size={20}
            onPress={() => { Logout(dispatch), navigation.navigate("Login") }}
          />),
        title: userLogin.fullname
      })
    }

  }, [])

  useEffect(() => {
    GettodoData();
  })

  const GettodoData = () => {
    GetTotoList().then((todoData) => {
      settodos(todoData)
    }).catch((e) => console.log(e))
  }

  const AddTodoList = () => {
    if (newTodo.length > 0) {
      const name = newTodo;
      const isDone = false;
      AddTodo(name, isDone).then(() => {
        setNewTodo("");
      })
        .catch((e) => console.log(e));
      setNewTodo("");
    }
  }

  const renderItem = ({ item }) => {
    const { id, name, isDone } = item;
    return (
      <Button
        icon={isDone ? "checkbox-marked" : "checkbox-blank"}
        onPress={() => { UpdateTodo(item) }}
      >
        {name}
      </Button>
    );
  }

  return (
    <View style={styles.container}>
      <Text>TodoApp</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        placeholder='New Todo'
        value={newTodo}
        onChangeText={(text) => setNewTodo(text)}
      />
      <Button mode='contained' name onPress={() => AddTodoList()} >
        Add Todo
      </Button>

    </View>
  )
}

export default TodoApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  }
})