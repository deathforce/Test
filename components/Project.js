import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

const { width } = Dimensions.get("screen");

class Project extends React.Component {
  render() {
    const {
      navigation,
      project,
      horizontal,
      full,
      style,
      priceColor,
      imageStyle,
    } = this.props;
    const imageStyles = [
      styles.image,
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle,
    ];
    console.log(project);
    return (
      <Block
        row={horizontal}
        card
        flex
        style={[styles.project, styles.shadow, style]}
      >
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Project", { project: project })}
        >
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            {/*/<Image source={{ uri: product.image }} style={imageStyles} />/*/}
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Project", { project: project })}
        >
          <Block flex space="between" style={styles.projectDescription}>
            <Text size={14} style={styles.projectTitle}>
              {project.title}
            </Text>
            <Text size={12} muted={!priceColor} color={priceColor}>
              ${project.price}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(Project);

const styles = StyleSheet.create({
  project: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  projectTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  projectDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
