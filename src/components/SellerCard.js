import React from 'react';
import {ListItem, Avatar, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';

const SellerCard = ({
  id='',
  name='',
  email='',
  deleteItem= () => {},
}) => {
  return(
    <ListItem bottomDivider>
      <Avatar
        source={
          require('../assets/user.png')
        }
      />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{id}</ListItem.Subtitle>
        <ListItem.Subtitle>{email}</ListItem.Subtitle>
      </ListItem.Content>
        <Button
          icon={
            <Icon
              name="delete-outline"
              size={25}
              color={colors.white}
            />
          }
          buttonStyle={{
            backgroundColor: colors.alizarin,
          }}
          title=""
          onPress={() => deleteItem(id)}
        />
    </ListItem>
  );
}

export default SellerCard;