import { Message } from "./Message.models";
import { Conversation } from "./Conversation.models";
import { User } from "./User.models";


User.hasMany(Conversation,{
    foreignKey:'convesation_id'
})

User.hasMany(Conversation,{
    foreignKey:'convesation_id'
})

Conversation.hasMany(User,{
    foreignKey:'convesation_id'
})
Message.belongsTo(User,{
    foreignKey:'convesation_id'
})
