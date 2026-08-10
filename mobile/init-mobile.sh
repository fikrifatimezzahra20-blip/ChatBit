#!/bin/bash

echo "🚀 Creating ChatBit mobile architecture..."

# App screens
mkdir -p app
mkdir -p "app/(auth)"
mkdir -p "app/(app)"
mkdir -p "app/(app)/chat"

touch app/_layout.tsx
touch app/index.tsx

touch "app/(auth)/login.tsx"
touch "app/(auth)/register.tsx"

touch "app/(app)/conversations.tsx"
touch "app/(app)/chat/[id].tsx"

# Components
mkdir -p components
touch components/Button.tsx
touch components/Input.tsx
touch components/ConversationItem.tsx
touch components/MessageBubble.tsx
touch components/TypingIndicator.tsx
touch components/PresenceIndicator.tsx

# Services
mkdir -p services
touch services/api.ts
touch services/auth.service.ts
touch services/conversation.service.ts
touch services/message.service.ts
touch services/socket.ts

# Hooks
mkdir -p hooks
touch hooks/useAuth.ts
touch hooks/useConversations.ts
touch hooks/useMessages.ts
touch hooks/useSocket.ts

# Lib
mkdir -p lib
touch lib/queryClient.ts
touch lib/storage.ts

# Stores
mkdir -p stores
touch stores/auth.store.ts
touch stores/chat.store.ts

# Types
mkdir -p types
touch types/auth.ts
touch types/conversation.ts
touch types/message.ts
touch types/socket.ts

echo ""
echo "✅ ChatBit mobile architecture created!"
echo ""
echo "📁 Structure:"
find app components services hooks lib stores types -print