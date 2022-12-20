import React from "react";
import {
  StyleSheet,
  Switch,
  FlatList,
  Platform,
  Alert,
  Button,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { SelectList } from "react-native-dropdown-select-list";
import { Icon as Icon2 } from "react-native-elements";
import { Block, Text, theme, Icon, Input } from "galio-framework";

import materialTheme from "../constants/Theme";

export default class PriceSheet extends React.Component {
  state = {
    visible: false,
    label: "string",
    selected: false,
    selectedData: [],
  };
  itemSelect = (val) => {
    const utilities = [
      { title: "Electric", description: "Per Foot" },
      { title: "Gas", description: "Per Foot" },
      { title: "Water", description: "Per Foot" },
      { title: "Sewer", description: "Per Foot" },
      { title: "Phone", description: "Per Foot" },
      { title: "Internet", description: "Per Foot" },
      { title: "Well", description: "Per Foot" },
      { title: "Septic", description: "Per Foot" },
    ];
    const Insulation = [
      { title: "Batt", description: "sq/ft" },
      { title: "Cellulose", description: "sq/ft" },
      { title: "Foam", description: "sq/ft" },
    ];
    const outdoorLivingSpace = [
      { title: "Living Space Paver", description: "sq/ft" },
      { title: "Living Space Stone", description: "sq/ft" },
      { title: "Living Space Concrete", description: "sq/ft" },
      { title: "Living Space Wood", description: "sq/ft" },
      { title: "Living Space Composite", description: "sq/ft" },
      { title: "UnCovered Living Space Paver", description: "sq/ft" },
      { title: "UnCovered Living Space Stone", description: "sq/ft" },
      { title: "UnCovered Living Space Concrete", description: "sq/ft" },
      { title: "UnCovered Living Space Wood", description: "sq/ft" },
      { title: "UnCovered Living Space Composite", description: "sq/ft" },
    ];
    const exteriorMaterial = [
      { title: "Vinyl Siding", description: "sq/ft" },
      { title: "Composite", description: "sq/ft" },
      { title: "Brick", description: "sq/ft" },
      { title: "Stone", description: "sq/ft" },
      { title: "Stucco", description: "sq/ft" },
    ];
    const Roofing = [
      { title: "Shingle", description: "sq/ft" },
      { title: "Steel", description: "sq/ft" },
      { title: "Tile", description: "sq/ft" },
    ];
    const windowsAndDoors = [
      { title: "Small Fixed Window", description: "Number of windows" },
      { title: "Medium Fixed Window", description: "Number of windows" },
      { title: "Large Fixed Window", description: "Number of windows" },
      { title: "Functional Single Pane", description: "Number of windows" },
      { title: "Functional Double Pane ", description: "Number of windows" },
      { title: "Functional Triple Pane ", description: "Number of windows" },
      { title: "Doors Main Entry", description: "Number of Doors" },
      { title: "Dooes Sliding Glass ", description: "Number of Doors" },
      { title: "Doors Steel", description: "Number of Doors" },
      { title: "Dooes French ", description: "Number of Doors" },
      {
        title: "Doors Folding/Multiple Sliding Glass",
        description: "Number of Doors",
      },
    ];

    this.setState({ selected: true });
    switch (val) {
      case "Utilities":
        this.setState({ selectedData: utilities });
        break;

      case "Outdoor Living Space":
        this.setState({ selectedData: outdoorLivingSpace });
        break;

      case "Insulation":
        this.setState({ selectedData: Insulation });
        break;

      case "Exterior Material":
        this.setState({ selectedData: exteriorMaterial });
        break;
      case "Roofing":
        this.setState({ selectedData: exteriorMaterial });
        break;
      case "Windows and Exterior Doors":
        this.setState({ selectedData: exteriorMaterial });
        break;

      default:
        this.setState({ selectedData: [] });
        Alert.alert("NUMBER NOT FOUND");
    }
  };

  toggleSwitch = (switchNumber) =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderInputs = ({ item }) => {
    return (
      <Block flex style={styles.group}>
        <Block
          row
          middle
          space="between"
          style={{ marginBottom: theme.SIZES.BASE }}
        >
          <Text size={11} style={{ marginLeft: 10 }}>
            {item.title}
          </Text>
          <Input
            placeholder={item.description}
            style={{ width: 110, marginRight: 10 }}
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            color="black"
          />
          <Input
            placeholder={item.description}
            style={{ width: 110, marginRight: 10 }}
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
          />
        </Block>
      </Block>
    );
  };

  render() {
    const data = [
      { key: "1", value: "Roofing" },
      { key: "2", value: "Outdoor Living Space" },
      { key: "3", value: "Utilities" },
      { key: "4", value: "Insulation" },
      { key: "5", value: "Exterior Material" },
      { key: "6", value: "Windows and Exterior Doors" },
    ];

    return (
      <View style={styles.settings}>
        <Block
          row
          middle
          space="between"
          style={{ marginBottom: theme.SIZES.BASE }}
        >
          <Text size={13} style={{ marginLeft: 10 }}>
            Price Sheet Name
          </Text>
          <Input
            placeholder="Please Enter Name"
            style={{ width: 110, marginRight: 10 }}
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            color="black"
          />
        </Block>
        <KeyboardAwareScrollView>
          <SelectList
            setSelected={(val) => this.itemSelect(val)}
            data={data}
            save="value"
          />

          <View style={{ flex: 1 }}>
            <Block>
              {this.state.selected && (
                <FlatList
                  data={this.state.selectedData}
                  keyExtractor={(item, index) => item.id}
                  renderItem={this.renderInputs}
                  ListHeaderComponent={
                    <Block
                      row
                      middle
                      space="between"
                      style={{ marginBottom: theme.SIZES.BASE }}
                    >
                      <Text bold size={16} style={styles.title}>
                        Title
                      </Text>
                      <Text bold size={16} style={styles.title}>
                        Low
                      </Text>
                      <Text bold size={16} style={styles.title}>
                        High
                      </Text>
                    </Block>
                  }
                  ListFooterComponent={<View style={{ height: 20 }} />}
                />
              )}
              <Block flex={1.25} right>
                <Button
                  center
                  shadowless
                  color="blue"
                  textStyle={styles.optionsText}
                  style={[styles.optionsButton, styles.shadow]}
                  title="SAVE FOR LATER"
                ></Button>
              </Block>
            </Block>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
    flex: 1,
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  overlay: {
    width: "100%",
    height: "100%",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  options: {
    paddingHorizontal: theme.SIZES.BASE / 2,
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: "#4a4a4a",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
});
