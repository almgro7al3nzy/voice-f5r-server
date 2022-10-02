import { gql } from 'react-apollo'

export const insertTextMessages = gql`
  mutation SendTextChatMessage($chatRoomId: ID!, $text: String!) {
    sendTextChatMessage(chatRoomId: $chatRoomId, text: $text) {
      text
    }
  }
`
export const inserAudioMessages = gql`
  mutation SendAudioChatMessage($chatRoomId: ID!, $base64EncodedAudioData: String!) {
    sendAudioChatMessage(chatRoomId: $chatRoomId, base64EncodedAudioData: $base64EncodedAudioData) {
      audioUrl
    }
  }
`
export const inserImageMessages = gql`
  mutation SendImageChatMessage($chatRoomId: ID!, $base64EncodedImageData: String!) {
    sendImageChatMessage(chatRoomId: $chatRoomId, base64EncodedImageData: $base64EncodedImageData) {
      imageUrl
    }
  }
`
