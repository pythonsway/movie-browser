import React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';

export default class SearchForm extends React.Component {
  state = {
    title: '',
    isFormValid: false,
    page: 1
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
    this.props.onSubmit(this.state, this.props.page);
    this.setState({
      page: this.state.page + 1
    });
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
          autoCapitalize="words"
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
