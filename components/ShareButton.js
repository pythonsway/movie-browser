import React from 'react';
import { Share, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class ShareButton extends React.Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message: `${this.props.title} (${this.props.year})`,
        title: 'Check out this movie'
      }, {
        // Android only:
        dialogTitle: 'Share movie title',
        // iOS only (via email):
        subject: 'Check out this movie'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };




  render() {
    console.log(this.props.title);
    return (
      <Ionicons
        style={styles.icon}
        onPress={this.onShare}
        name="ios-share-alt"
        size={24}
        color="black"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 20
  },
});

export default ShareButton;