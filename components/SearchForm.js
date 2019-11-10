import React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';


export default class SearchForm extends React.Component {
  // Shorthand for:
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  // During compilation also moves other class propeties, like:
  // this.someThing = () => 
  state = {
    title: '',
    isFormValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.title !== prevState.title) {
      this.validateForm();
    }
  };

  handleTitleChange = title => {
    this.setState({
      title
    });
  };

  validateForm = () => {
    const title = this.state.title.trim();
    this.setState({
      isFormValid: (title.length > 2) ? true : false
    });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.title);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          autoFocus={true}
          style={styles.input}
          value={this.state.title}
          onChangeText={this.handleTitleChange}
          placeholder="Movie title"
          autoCapitalize="none"
          clearButtonMode="always"
        />
        <Button title="Search" onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
  },
  input: {
    height: 50,
    borderWidth: 3,
    borderColor: 'orange',
    minWidth: 200,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    margin: 10,
    fontSize: 20
  },
})
