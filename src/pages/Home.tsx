import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

import { Header } from '../components/Header';
import { ItemWrapper } from '../components/ItemWrapper';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number,
  newTaskTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const taskAlreadyExsits = tasks.find(task => task.title === newTaskTitle);

    if (taskAlreadyExsits) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "OK",
          },
        ]
      );

      return;
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
  
      setTasks((oldTasks) => [...oldTasks, newTask]);
    }
    
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}));

    const foundItem = updatedTasks.find(item => item.id === id)
    
    if(!foundItem){
      return;
    } else {
      foundItem.done = !foundItem.done;
    }

    setTasks(updatedTasks);
  }

  function handleEditTask ({ taskId, newTaskTitle }:EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({...task}));

    const foundItem = updatedTasks.find(item => item.id === taskId)
    
    if(!foundItem){
      return;
    } else {
      foundItem.title = newTaskTitle;
    }

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover Item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "SIM", onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== id);

          setTasks(updatedTasks);
        } }
      ]
    );
    //TODO - remove task from state
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask = {handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})