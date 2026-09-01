import { Message } from "./Message.models";
import { Conversation } from "./Conversation.models";
import { User } from "./User.models";

// User & Conversation
User.hasMany(Conversation, { foreignKey: 'client_id', as: 'clientConversations' });
User.hasMany(Conversation, { foreignKey: 'agent_id', as: 'agentConversations' });
Conversation.belongsTo(User, { foreignKey: 'client_id', as: 'client' });
Conversation.belongsTo(User, { foreignKey: 'agent_id', as: 'agent' });

// Conversation & Message
Conversation.hasMany(Message, { foreignKey: 'conversation_id', as: 'messages' });
Message.belongsTo(Conversation, { foreignKey: 'conversation_id', as: 'conversation' });

// User & Message
User.hasMany(Message, { foreignKey: 'sender_id', as: 'messages' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });

export { User, Conversation, Message };

