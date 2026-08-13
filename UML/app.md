classDiagram

    class User {
        +int id
        +string full_name
        +string email
        +string password_hash
        +Role role
        +boolean is_online
        +datetime created_at
    }

    class Conversation {
        +int id
        +string subject
        +ConversationStatus status
        +int client_id
        +int agent_id
        +datetime created_at
        +datetime closed_at
    }

    class Message {
        +int id
        +int conversation_id
        +int sender_id
        +string content
        +boolean is_read
        +datetime sent_at
    }

    class Role {
        <<enumeration>>
        CLIENT
        AGENT
    }

    class ConversationStatus {
        <<enumeration>>
        EN_ATTENTE
        EN_COURS
        CLOSED
    }

    User "1" --> "0..*" Conversation : as client
    User "1" --> "0..*" Conversation : as agent

    Conversation "1" --> "0..*" Message : contains

    User "1" --> "0..*" Message : sends

    User --> Role : has
    Conversation --> ConversationStatus : has