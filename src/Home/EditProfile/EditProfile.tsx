import { DrawerActions } from "@react-navigation/native";
import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { Box, Header, Text, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Tabs from "./Tabs";
import Configuration from "./Configuration";
import PersonalInfo from "./PersonalInfo";
import { AuthContext } from "../../Services";
import { Avatar } from "react-native-paper";

const { width } = Dimensions.get("window");
const tabs = [
  { id: "info", title: "Personal Info" },
  { id: "config", title: "Configuration" },
];

const EditProfile = ({ navigation }: HomeNavigationProps<"EditProfile">) => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <Box flex={1} backgroundColor="background">
      <Box flex={0.2} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="Edit Profile"
            left={{
              icon: "menu",
              onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
            }}
            dark
          />
        </Box>
      </Box>
      <Box>
        <Box position="absolute" left={width / 2 - 50} top={-50}>
          {user?.profilePicture ? (
            <Avatar.Image
              size={100}
              source={{
                uri: `http://192.168.18.8:8000/api/profile-picture/${user.profilePicture}`,
              }}
            />
          ) : (
            <Avatar.Icon
              size={100}
              icon="human"
              color="white"
              style={{
                backgroundColor: theme.colors.primary,
              }}
            />
          )}
        </Box>
        <Box marginVertical="m" style={{ marginTop: 50 + theme.spacing.m }}>
          <Text variant="title1" textAlign="center">
            {user?.name}
          </Text>
          <Text variant="body" textAlign="center">
            {user?.email}
          </Text>
        </Box>
      </Box>
      <Tabs tabs={tabs}>
        <PersonalInfo />
        <Configuration />
      </Tabs>
    </Box>
  );
};

export default EditProfile;
