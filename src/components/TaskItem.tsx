import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { EditTaskArgs } from "../pages/Home";
import { Task } from "./TasksList";
import trashIcon from '../assets/icons/trash/trash.png'


interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, newTaskTitle }: EditTaskArgs) => void;
}

export function TaskItem({ task, editTask, removeTask, toggleTaskDone}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, newTaskTitle: taskNewTitleValue});
    setIsEditing(false)    
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer} >
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          //TODO - use onPress (toggle task) prop
        >
          <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            //TODO - use style prop 
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          {/* <Text 
          style={task.done ? styles.taskTextDone : styles.taskText}
            //TODO - use style prop
          >
            {task.title}
          </Text> */}
          <TextInput 
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable = {isEditing}
            onSubmitEditing = {handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        style={{ paddingHorizontal: 24 }}
        //TODO - use onPress (remove task) prop
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} />
      </TouchableOpacity> */}

      <View style={styles.iconsContainer} >
        {isEditing ? (
          //Enquanto o isEditing for true, tem que aparecer o X pra cancelar a edição
          <TouchableOpacity
          onPress={handleCancelEditing}
        >
           <Icon name="x" size={24} color="#b2b2b2" />
        </TouchableOpacity>
        ) : 
        (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Icon name="edit-3" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,

  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 12
  }
})